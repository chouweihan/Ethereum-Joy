import React,  { useCallback, useEffect, useState }  from 'react'
import { filterIn, filterOut, sortByBiggestGas } from '../../Utility/transactions';
import { splitEth, calculateEthToString } from '../../Utility/formatter';
import { useWallet } from '../../Contexts/WalletContext';
import { Card, CardHeader, CardContent, Typography, Stack, Tooltip } from "@mui/material";
import { ethers, BigNumber } from 'ethers';
import { ITransaction } from '../../Interfaces/ITransaction';
import HighlightText from './HighlightText';
import EthIcon from '../Shared/EthIcon';
import { getCurrencySymbol } from '../../Utility/currency';

type TBigValueInfo = {
  outgoingData: Array<ITransaction>,
  incomingData: Array<ITransaction>,
  outgoingValue: string,
  incomingValue: string
}

const BigValueCard = () => {

    const {
      wallet: { curAddress, transactions, currency: { type, value } },
    } = useWallet();

    const [data, setData] = useState<TBigValueInfo>({
      outgoingData: [],
      incomingData: [],
      outgoingValue: "0",
      incomingValue: "0"
    });
    

    const computeGasInfo = useCallback(() => {
        if(transactions.length > 0) {
          const sortedTransactions = sortByBiggestGas(transactions);
          const incomingTransactions = filterIn(sortedTransactions, curAddress);
          const outgoingTransactions = filterOut(sortedTransactions, curAddress);

          const ov = ethers.utils.formatEther(outgoingTransactions
            .reduce((prev: BigNumber, cur) => { 
                return prev.add(BigNumber.from(cur.value))}
                , BigNumber.from(0)));

          const iv = ethers.utils.formatEther(incomingTransactions
            .reduce((prev: BigNumber, cur) => { 
                return prev.add(BigNumber.from(cur.value))}
                , BigNumber.from(0)));      

          setData((prev) => {
            return {
              outgoingData: outgoingTransactions,
              incomingData: incomingTransactions,
              outgoingValue: ov,
              incomingValue: iv
            }
          });        
        }
    // eslint-disable-next-line
    }, [transactions])
  
    useEffect(() => {
            computeGasInfo();
    }, [transactions, computeGasInfo])

  return (
    <Card>
      <CardHeader title={`${(data.outgoingData.length === 0 && data.incomingData.length === 0) ? "Empty crypto wallet, just like my real life wallet." : "YUUUUUGE Value"}`} subheader="Why flex brand name clothing when u can flex your wallet?" />
      {
        data.outgoingData.length === 0 && data.incomingData.length === 0 &&
        <CardContent>
          <Typography fontSize={17}>
              You have no transaction :(
              <br/>
              Come back here after spending some ETH.
          </Typography>
        </CardContent>
      }

      {
        (data.outgoingData || data.incomingData) &&
        <CardContent>
        <Stack spacing={1}>
          <Typography fontSize={17}>
             Total outgoing ETH sent from your wallet: <EthIcon style={{ marginRight: 0 }} /> <HighlightText>{splitEth(data.outgoingValue)}</HighlightText> 
             {" "} 
             <Tooltip title={`1 ETH = ${getCurrencySymbol(type)} ${Number(value).toFixed(2)} ${type}`} placement="top">
                <span style={{cursor: "help"}}>({getCurrencySymbol(type)}{calculateEthToString(data.outgoingValue, value)} {type})</span>
             </Tooltip>

          </Typography>
          <Typography fontSize={17}>
             Total incoming ETH sent to your wallet: <EthIcon style={{ marginRight: 0 }} /> <HighlightText>{splitEth(data.incomingValue)}</HighlightText>
             {" "} 
             <Tooltip title={`1 ETH = ${getCurrencySymbol(type)} ${Number(value).toFixed(2)} ${type}`} placement="top">
                <span style={{cursor: "help"}}>({getCurrencySymbol(type)}{calculateEthToString(data.incomingValue, value)} {type})</span>
             </Tooltip>
          </Typography>
        </Stack>
      </CardContent>
      }
    </Card>
  )
}

export default BigValueCard