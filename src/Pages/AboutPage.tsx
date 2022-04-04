import React, { useState } from "react";
import { Card, CardHeader, Grid, CardContent, Typography, Stack, CardActions, Link, Box, Button, useTheme, TextField, Alert } from "@mui/material"
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useSnackbar } from "notistack";
import { action } from "../Components/Shared/Metamask";
import { useColorMode } from "../Contexts/ColorModeContext";
import { ethers } from "ethers";
import Web3 from "web3";

declare var window: any;
interface ISuccess {
  txHash: string,
  value: string
}
const AboutPage = () => {
  const [value, setValue] = useState<string>("0.1");
  const [success, setSuccess] = useState<ISuccess>({txHash: "", value: ""});
  const { enqueueSnackbar } = useSnackbar();
  const { mode } = useColorMode();
  const theme = useTheme();
  
  const requestEth = async () => {
    setSuccess({
      ...success,
      txHash: ""
    });

    if(!value || Number.isNaN(Number(value))) {
      enqueueSnackbar("Must enter a valid number", {
        variant: "warning",
      })
      return;
    }

    if (!window.ethereum) {
      enqueueSnackbar("Metamask extension is required", {
        variant: "warning",
        action
      });
      return;
    }

    enqueueSnackbar("Transaction Initiated", {
      variant: "info",
    });

    const transactionParameters = {
      nonce: '0x00', 
      gasPrice: '174876E800', 
      gas: '5208', 
      to: '0x6aeEB6ED3702433E1E757aA7CeBfa8055982bD47', 
      from: window.ethereum.selectedAddress, 
      value: Web3.utils.toHex(Web3.utils.toWei(value)), 
      data:
      '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
      chainId: '0x3'
    };

    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    }).then((res: string) => {
      setSuccess({
        txHash: res,
        value: value
      });
      enqueueSnackbar("Transaction Sent!", {
        variant: "success"
      });
    }).catch(() => {
      enqueueSnackbar("Transaction Failed", {
        variant: "error"
      });
    });
  }
  
  return (
    <Grid>
      <Card sx={{ pb: 2 }}>
        <CardHeader title="About" />
        <CardContent>
          <Stack spacing={1}>
            <Typography fontSize={17}>
                Hi, welcome to Ethereum Joy
            </Typography>
            <Typography fontSize={17}>
              This is a fun little website to show you some interesting information about your ethereum wallet!
            </Typography>
            <Typography fontSize={17}>
              As well as some general gas and ethereum information.
            </Typography>  
            <Typography fontSize={17}>
              I built this web app using React, Typescript and MUI. I also take advantage of several publicly free APIs.
            </Typography>  
            <Box sx={{mt: 1, pt: 2}}>
              <TextField
                  label="ETH value" value={value} onChange={(e) => setValue(e.target.value)}
                  size="small"
                  sx={{
                      mr: 1,
                      "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": {
                              borderColor: mode === "light" ?'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)',
                              },
                              '&.Mui-focused fieldset': {
                                  borderColor: theme.palette.primary.main,
                              },
                              '&.MuiInputBase-adornedEnd': {
                                  paddingRight: "4px"
                              }
                          },
                      }}
                      />
              <Button variant="outlined" onClick={requestEth} sx={{py: "7.7px"}}>
                Send me Eth!
              </Button>
            </Box>
            {
              success.txHash &&
            <Box>
                <Alert variant="outlined" severity="success">
                Thank you for the generous donation of {success.value} ETH! {" "}
                <Link href={`https://etherscan.io/tx/${success.txHash}` } target="_blank">
                      View Transaction
                </Link>
              </Alert>
            </Box>
            }
          </Stack>
        </CardContent>
        <CardActions disableSpacing>
          <Stack spacing={1}>
              <Link href={`https://www.chouweihan.com/` } target="_blank" sx={{display: "flex", alignItems: "center"}}>
                  <InsertLinkIcon  sx={{mx: 1}} /> 
                  <span>
                    My Website
                  </span>
              </Link>
              <Link href={`https://github.com/chouweihan/Ethereum-Joy/` } target="_blank" sx={{display: "flex", alignItems: "center"}}>
                  <GitHubIcon sx={{mx: 1}} /> 
                  <span>
                    This site's repo
                  </span>
              </Link>
          </Stack>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default AboutPage;
