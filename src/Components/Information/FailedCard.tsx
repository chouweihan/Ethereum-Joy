import React, { useEffect, useState, useCallback } from 'react'
import { useWallet } from '../../Contexts/WalletContext';
import { ethers, BigNumber } from 'ethers';
import { filterOut, filterErrorSuccess, sortByBiggestGas } from '../../Utility/transactions';
import { getGasBigNumber, getGasEthString } from '../../Utility/formatter';
import { Card, CardHeader, CardContent, Typography, Stack, Link } from "@mui/material";
import HighlightText from "./HighlightText";
import EthIcon from '../Shared/EthIcon';
import { splitEth, calculateEthToString } from "../../Utility/formatter"
import { getCurrencySymbol } from "../../Utility/currency"


interface IGasFailInformation {
    gasWasted: string,
    failedAmount: number,
    outgoingAmount: number,
    highestFail: string,
    highestTransaction: string
}

const FailedCard = () => {
    const [gasInfo, setGasInfo] = useState<IGasFailInformation>({ 
        gasWasted: "0", 
        failedAmount: 0, 
        outgoingAmount: 0, 
        highestFail: "0", 
        highestTransaction: "" });

    const {
      wallet: { curAddress, transactions, currency: { type, value } },
    } = useWallet();
    
    const computeGasInfo = useCallback(() => {
        if(transactions.length > 0) {
            const outgoingTransactions = filterOut(transactions, curAddress);
            const gasTransactions = sortByBiggestGas(filterErrorSuccess(outgoingTransactions, true));
            
            const gasWasted = ethers.utils.formatEther(gasTransactions
                .reduce((prev: BigNumber, cur) => { 
                    return prev.add(getGasBigNumber(cur))}
                    , BigNumber.from(0)));  
                            
                    
            setGasInfo(prev => {return {
                ...prev, 
                gasWasted, 
                failedAmount: gasTransactions.length,
                outgoingAmount: outgoingTransactions.length,
                highestFail: gasTransactions ? getGasEthString(gasTransactions[0]) : "",
                highestTransaction: gasTransactions ? gasTransactions[0].hash : ""
            }});
        }
    // eslint-disable-next-line
    }, [transactions])
  
    useEffect(() => {
            computeGasInfo();
    }, [transactions, computeGasInfo])
  

  return (
    <Card>
        <CardHeader title={gasInfo.failedAmount > 0 ? "The Big Fail" : "The Bullet Dodger"}   subheader={gasInfo.failedAmount > 0 ? "Oh yeah, this ones gonna hurt" : "You must be personally blessed by god"} />
       {
           gasInfo.failedAmount > 0 ? 
            <CardContent>
                <Stack spacing={1}>
                    <Typography fontSize={17}>
                        Wow! <HighlightText>{gasInfo.failedAmount}</HighlightText> out of {gasInfo.outgoingAmount} of your outgoing transactions have failed!
                    </Typography>
                    <Typography fontSize={17}>
                        That's a whopping <HighlightText>{((gasInfo.failedAmount / gasInfo.outgoingAmount) * 100).toFixed(2)}%</HighlightText> of your transactions.
                    </Typography>
                    <Typography alignContent="center" fontSize={17}>
                        Flushing <EthIcon /> 
                        <HighlightText style={{ marginRight: "4px"}}>
                            {splitEth(gasInfo.gasWasted)} 
                        </HighlightText>
                        ETH straight down the toilet.
                    </Typography>
                    <Typography alignContent="center" fontSize={17}>
                        Just to remind you of the pain, that's 
                        <HighlightText style={{marginLeft: "4px", marginRight: "4px"}}>
                            {getCurrencySymbol(type)}{calculateEthToString(gasInfo.gasWasted, value)} {type}
                        </HighlightText>
                        in today's value!
                    </Typography>
                    <Typography>
                        Your mostly costly failed <Link target="_blank" href={`https://etherscan.io/tx/${gasInfo.highestTransaction}`}>transaction</Link> costed you <EthIcon /> 
                        <HighlightText>{splitEth(gasInfo.highestFail)}</HighlightText>
                    </Typography>
                </Stack>
            </CardContent>
            :
           <CardContent>
               <Stack spacing={1}>
                <Typography fontSize={17}>
                        Lucky you! you haven't yet failed a single outgoing transactions.
                </Typography>
                <HighlightText>
                    Dont jinx it!
                </HighlightText>
               </Stack>
            </CardContent>
        }
    </Card>
  )
}

export default FailedCard