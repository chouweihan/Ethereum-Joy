import React from 'react'
import { useWallet } from '../Contexts/WalletContext';
import { useTheme, Grid, Alert, Paper, Stack } from '@mui/material';
import PleaseConnect from '../Components/Shared/PleaseConnect';
import Loader from '../Components/Shared/Loader';
import FailedCard from '../Components/Information/FailedCard';
import BigGasCard from '../Components/Information/BigGasCard';
import AudioCard from '../Components/Information/AudioCard';
import { useColorMode } from '../Contexts/ColorModeContext';
import GeneralGasCard from '../Components/Information/GeneralGasCard';
import BigValueCard from '../Components/Information/BigValueCard';
import GasPrice from '../Components/Information/GasPrice';

const AudioFooter = () => {
  const { drawerWidth, isDrawerOpen } = useColorMode();
  const theme = useTheme();
  return (
      <Paper sx={{ position: 'fixed', bottom: 0, right: 0, left: 0, 
        paddingLeft: isDrawerOpen ? drawerWidth : 0,
        zIndex: 1202,
        transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      ...(isDrawerOpen && {
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }),
      
    }} elevation={2}>
        <AudioCard />
    </Paper>
  )
}

const InformationPage = () => {

  const {
    wallet: { curAddress, transactions, loading },
  } = useWallet();

  if(!curAddress) {
    return (
      <>
        <GasPrice />
        <PleaseConnect />
        <AudioFooter />
      </>
    )
  }

  if(loading) {
    return (
      <>
        <GasPrice />
        <Loader px={2} />
        <AudioFooter />
      </>
    )
  }

  if(transactions.length === 0) {
    return (
      <>
        <GasPrice />
        <Alert severity="warning" variant="outlined">
              No transactions exist for this address
        </Alert>
        <AudioFooter />
      </>
    )
  }

  return (
    <Grid container spacing={2} sx={{ pb: "59px" }}>
      <Grid item xs={12}>
        <GasPrice />
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack spacing={2}>
          <FailedCard />
          <GeneralGasCard />
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack spacing={2}>
          <BigGasCard />
          <BigValueCard />
        </Stack>
      </Grid>
      <AudioFooter />
    </Grid>
  )
}

export default InformationPage


