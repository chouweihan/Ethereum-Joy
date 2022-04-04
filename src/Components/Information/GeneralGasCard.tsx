import React,  { useCallback, useEffect, useState }  from 'react'
import { filterOut, sortByBiggestGas } from '../../Utility/transactions';
import { getGasBigNumber, splitEth, calculateEthToString } from '../../Utility/formatter';
import { useWallet } from '../../Contexts/WalletContext';
import { Card, CardHeader, CardContent, Typography, Stack } from "@mui/material";
import { ethers, BigNumber } from 'ethers';
import { ITransaction } from '../../Interfaces/ITransaction';
import HighlightText from './HighlightText';
import EthIcon from '../Shared/EthIcon';
import { getCurrencySymbol } from '../../Utility/currency';

type TGeneralGasInfo = {
  outgoingData: Array<ITransaction>,
  gasSpent: string
}


const GeneralGasCard = () => {

    const {
      wallet: { curAddress, transactions, currency: { type, value } },
    } = useWallet();

    const [data, setData] = useState<TGeneralGasInfo>({
      outgoingData: [],
      gasSpent: "0"
    });
    

    const computeGasInfo = useCallback(() => {
        if(transactions.length > 0) {
          const sortedTransactions = sortByBiggestGas(transactions);
          const outgoingTransactions = filterOut(sortedTransactions, curAddress);
          
          const gs = ethers.utils.formatEther(outgoingTransactions
            .reduce((prev: BigNumber, cur) => { 
                return prev.add(getGasBigNumber(cur))}
                , BigNumber.from(0))); 


          setData((prev) => {
            return {
              outgoingData: outgoingTransactions,
              gasSpent: gs
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
      <CardHeader title="Gas Gas Gas" subheader="solid... liquid... gas?" />
      {
        data.outgoingData.length === 0 &&
        <CardContent>
          <Typography fontSize={17}>
              You have no transaction :(
              <br/>
              Come back here after spending some ETH.
          </Typography>
        </CardContent>
      }

      {
        data.outgoingData &&
        <CardContent>
        <Stack spacing={1}>
          <Typography fontSize={17}>
              From a total of <HighlightText>{data.outgoingData.length}</HighlightText> out-going transactions, you have spent
              a total of <EthIcon style={{ marginRight: 0 }} /> <HighlightText>{splitEth(data.gasSpent)}</HighlightText> on gas.
          </Typography>
          <Typography>
            That's 
            <HighlightText style={{marginLeft: "4px", marginRight: "4px"}}>
                {getCurrencySymbol(type)}{calculateEthToString(data.gasSpent, value)} {type}
            </HighlightText>
            in today's value!
          </Typography>
          <Typography variant="caption">
            P.S check out gas gas gas with the audio player at the bottom. classic song. gaseous af.
          </Typography>
        </Stack>
      </CardContent>
      }
    </Card>
  )
}

export default GeneralGasCard