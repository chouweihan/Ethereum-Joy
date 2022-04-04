import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Grid, Card, Typography, CardContent, Box, Divider, SvgIcon, LinearProgress } from '@mui/material'
import { ethers } from "ethers";
import {useColorMode} from "../../Contexts/ColorModeContext"
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import NordicWalkingIcon from '@mui/icons-material/NordicWalking';

interface IGasPrice {
    rapid: number,
    fast: number,
    standard: number,
    slow: number
}

const icons = {
    rapid: <RocketLaunchIcon />,
    fast: <FlightTakeoffIcon />,
    standard: <DirectionsCarFilledIcon />,
    slow: <NordicWalkingIcon />
}

type TGasTypes = "slow" | "standard" | "rapid" | "fast";

const GasCard = ({ value, type }: {  value: number, type: TGasTypes }) => {

    return (
        <Grid item xs={6} md={3} textAlign="center">
            <Card>
                <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="center"> 
                        <SvgIcon sx={{fontSize: "17px", mr: "3px"}} color="primary">
                            {icons[type]}
                        </SvgIcon>
                        <Typography fontSize={17} sx={{ textTransform: "capitalize" }}>
                            {type}
                        </Typography>
                    </Box>
                    <Typography fontSize={20} mt={2}>
                        {ethers.utils.formatUnits(value, "gwei").split(".")[0]} GWei
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

const GasPrice = () => {
  const { mode } = useColorMode();  
  const [count, setCount] = useState<number>(0);
  const [gas, setGas] = useState<IGasPrice>({
      rapid: 0,
      fast: 0,
      standard: 0,
      slow: 0
  });

  const fetchData = () => {
    axios.get("https://etherchain.org/api/gasnow")
    .then((res) => {
        const data = res.data.data;
        setGas({
            ...data
        })
    })
  }

  useEffect(() => {
    fetchData();
    let interval = setInterval(() => {
        setCount(prev => {
            if(prev < 10) {
                return prev + 1
            } else {
                return 0;
            }
        })
    }, (1000))

    return () => clearInterval(interval);
  }, [])
  

  useEffect(() => {
    if(count === 10) {
        fetchData();
    }
  }, [count])

  return (
    <Grid container spacing={1}>
        <Grid item xs={12}>
            <Box width={1}>
                <Divider>
                    <Typography fontSize={18}
                    sx={{
                        color: mode === "dark" ? "white" : "black"
                    }}
                    >Gas Price</Typography>
                </Divider>
            </Box>
        </Grid>
        <GasCard value={gas.rapid} type={"rapid"} />
        <GasCard value={gas.fast} type={"fast"} />
        <GasCard value={gas.standard} type={"standard"} />
        <GasCard value={gas.slow} type={"slow"} /> 
        <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress variant="determinate" value={count * 10}/>
                </Box>
                <Box sx={{ minWidth: 105 }}>
                    <Typography variant="body2" 
                    sx={{
                       color: mode === "dark" ? "white" : "black"
                    }}
                    >updates in {10 - count}s</Typography>
                </Box>
            </Box>
        </Grid>
        <Grid item xs={12}>
            <Divider />
        </Grid>
    </Grid>
  )
}

export default GasPrice