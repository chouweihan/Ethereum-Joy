import React from 'react'
import { useWallet } from '../Contexts/WalletContext';
import { useTheme, Grid, Alert, Paper } from '@mui/material';
import PleaseConnect from '../Components/Shared/PleaseConnect';
import Loader from '../Components/Shared/Loader';
import FailedCard from '../Components/Information/FailedCard';
import BigGasCard from '../Components/Information/BigGasCard';
import AudioCard from '../Components/Information/AudioCard';
import { useColorMode } from '../Contexts/ColorModeContext';
const InformationPage = () => {

  const { drawerWidth, isDrawerOpen } = useColorMode();
  const {
    wallet: { curAddress, transactions, loading },
  } = useWallet();
  const theme = useTheme();


  if(!curAddress) {
    return (
      <PleaseConnect />
    )
  }

  if(loading) {
    return (
      <Loader px={2} />
    )
  }

  if(transactions.length === 0) {
    return (
      <Alert severity="warning" variant="outlined">
            No transactions exist for this address
      </Alert>
    )
  }

  return (
    <Grid container spacing={1} sx={{ pb: "59px" }}>
      <Grid item xs={12} md={6}>
        <FailedCard />
      </Grid>
      <Grid item xs={12} md={6}>
        <BigGasCard />
      </Grid>
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
    </Grid>
  )
}

export default InformationPage