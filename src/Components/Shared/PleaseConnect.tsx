import React from 'react'
import { Box, Alert } from '@mui/material'
import { ReactComponent as MetamaskIcon } from "../../Assets/Icon/metamask.svg";

const PleaseConnect = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" sx={{ padding: 5}}>
        <Alert severity="info" variant="outlined" sx={{ mb: 5, fontFamily: "'Open Sans', sans-serif"}}>
            Please connect or enter an Ethereum address
        </Alert>
        <MetamaskIcon />    
    </Box>
  )
}

export default PleaseConnect