import React, { useEffect, useCallback, useState } from 'react'
import { Card, CardContent, CardHeader, Typography, Stack, Table, TableHead, TableRow, TableCell, TableBody, Link, Box } from '@mui/material'
import { useWallet } from '../../Contexts/WalletContext';
import { calculateEthToString, getGasBigNumber, weiToEthString4D  } from '../../Utility/formatter';
import { ethers, BigNumber } from 'ethers';
import { filterOut, sortByBiggestGas, filterErrorSuccess } from '../../Utility/transactions';
import { ITransaction } from '../../Interfaces/ITransaction';
import HighlightText from './HighlightText';
import { getGasEthString, calculateWeiToString, splitEth } from '../../Utility/formatter';
import { Tooltip } from '@mui/material';
import EthIcon from '../Shared/EthIcon';
import { getCurrencySymbol } from '../../Utility/currency';
const BigGasCard = () => {
    const [ggvSorted, setGgvSorted] = useState<Array<ITransaction>>([]);
  
    const {
      wallet: { curAddress, transactions, currency: { type, value } },
    } = useWallet();


    
    const computeGasInfo = useCallback(() => {
        if(transactions.length > 0) {
            const outgoingTransactions = filterOut(transactions, curAddress);
            const gasGTEValueTransactions = sortByBiggestGas(filterErrorSuccess(outgoingTransactions, false))
            .filter((t) => {
                return t.value !== "0" && getGasBigNumber(t).gte(BigNumber.from(t.value));
            });

            setGgvSorted(gasGTEValueTransactions);
        }
    // eslint-disable-next-line
    }, [transactions])
  
    useEffect(() => {
            computeGasInfo();
    }, [transactions, computeGasInfo])

  if(ggvSorted.length === 0) {
    return (
      <Card>
        <CardHeader title="Gas Newbie" subheader="It's probably better this way"/>
        <CardContent>
          <Typography fontSize={17}>
            Seems like you haven't participated in a gas war before. You don't have any outgoing transactions where you've paid more gas than your transaction value.
          </Typography>
        </CardContent>
      </Card>
    )
  }  
  

  return (
    <Card>
        <CardHeader title="Gas Genius or Gas Idiot?" subheader="based on non-zero value transactions"/>
        <CardContent>
          <Stack spacing={1}>
            <Typography fontSize={17}>
                Incredible! You have an entire <HighlightText>{ggvSorted.length}</HighlightText> transaction{ggvSorted.length > 1 ? "s" : ""} where you've spent more on gas than the transaction value!
            </Typography>
            <Typography fontSize={17}>
                Let's take a look at {ggvSorted.length > 3 ? "3" : `${ggvSorted.length}`} of your transactions.
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Hash</TableCell>
                  <TableCell>Gas Spent</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  ggvSorted.slice(0, 3).map((t) => {
                    return <TableRow key={t.hash}>
                      <TableCell> 
                        <Link href={`https://etherscan.io/tx/${t.hash}`} target="_blank" underline="none">
                          {t.hash.substring(0, 7)}...
                        </Link>
                      </TableCell>  
                      <TableCell>
                        <Tooltip title={`${getCurrencySymbol(type)} ${calculateEthToString(getGasEthString(t), value)}`}>
                            <Box display="flex" alignItems="center" sx={{cursor: "help"}}><EthIcon />{splitEth(getGasEthString(t))}</Box>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Tooltip title={`${getCurrencySymbol(type)} ${calculateWeiToString(t.value, value)}`}>
                            <Box display="flex" alignItems="center" sx={{cursor: "help"}}><EthIcon />{splitEth(weiToEthString4D(t.value))}</Box>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  })
                }
              </TableBody>
            </Table>
            <Typography fontSize={17}>
              Did you make the right decisions to spend that much on gas? Was it a gas war? <br/> Only you know whether you're a gas genius or a gas idiot.
            </Typography>
          </Stack>
        </CardContent>
    </Card>
  )
}

export default BigGasCard