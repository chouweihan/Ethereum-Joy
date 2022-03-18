import React, { useEffect, useState } from "react";
import { useWallet } from "../../Contexts/WalletContext";
import { TextField, Grid, Paper, useTheme, Box, CircularProgress, Typography, IconButton, InputAdornment } from "@mui/material";
import { useColorMode } from "../../Contexts/ColorModeContext";
import { useSnackbar } from "notistack";
import { CustomSelect, StyledOption } from "./CurrencySelect";
import { currencyTypes } from "../../Assets/Data/CurrencyTypes";
import { ReactComponent as EthereumIcon } from "../../Assets/Icon/ethereum.svg"
import axios from "axios";
import { weiToEthString4D , calculateEthToString } from "../../Utility/formatter";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import PaidIcon from '@mui/icons-material/Paid';
import Web3 from "web3";
import { getCurrencySymbol } from "../../Utility/currency";

const AddressBar = () => {
  const theme = useTheme();
  const { mode } = useColorMode();
  const { enqueueSnackbar } = useSnackbar();
  const {
    wallet: { curAddress, currency, inputAddress },
    setCurAddress,
    setCurrencyType,
    setInputAddress
  } = useWallet();

  const [walletEth, setWalletEth] = useState<string>("0");


  useEffect(() => {
    if (curAddress) {
      setInputAddress(curAddress);
      axios
        .get(
          `https://api.etherscan.io/api?module=account&action=balance&address=${curAddress}&tag=latest&apikey=${process.env.REACT_APP_ETHERSCAN_KEY}`
        )
        .then(({ data }) => {
          setWalletEth(weiToEthString4D(data.result));
        }).catch(()=> {
          enqueueSnackbar(`Error fetching wallet from etherscans`, {
            variant: "error",
            autoHideDuration: 3000
          });
        });   
    }
    // eslint-disable-next-line
  }, [curAddress]);

  const handleAddressBarSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if(Web3.utils.isAddress(inputAddress)) {
        setCurAddress(inputAddress);
        enqueueSnackbar(`Address set to ${inputAddress}`, {
            variant: "success",
            autoHideDuration: 3000
          });
    } else {
        enqueueSnackbar(`"${inputAddress}" is not a valid address`, {
            variant: "error",
            autoHideDuration: 3000
          });
    }
  }

  return (
    <Paper
      sx={{ margin: theme.spacing(3, 0), padding: theme.spacing(1, 1) }}
      elevation={mode === "light" ? 1 : 2}
    >
      <Grid container
            spacing={2}
            justifyContent="space-between"
            alignItems="center">
        <Grid item xs={12} md={5} lg={5} display="flex">
          <form style={{width: '100%'}}>
            <TextField
              fullWidth label="Search address" value={inputAddress} onChange={(e) => setInputAddress(e.target.value)}
              size="small"
              sx={{
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                      <IconButton onClick={(e) => handleAddressBarSubmit(e)} type="submit">
                        <ManageSearchIcon sx={{ color: theme.palette.primary.main}}/>
                      </IconButton>
                  </InputAdornment>
                )
              }}
              />
          </form>   
        </Grid>
        <Grid item xs={12} md={7} lg={6}>
            <Box sx={{display: 'flex', 
            alignItems: "center",
            fontFamily: "'Open Sans', sans-serif",
            fontSize: {
              xs: "14px",
              md: "16px"
            },
            justifyContent: {
                sm: "space-between",
                md: "flex-end",
                backgroundColor: theme.palette.secondary.light,
                borderRadius: "4px"
            }}}>
              <Box sx={{flexGrow: 1, display: "flex", alignItems: "center", paddingLeft: 1}}>
                <EthereumIcon style={{width: "12px", height: '17px', ...(mode === "dark" && { filter: "invert(100%)"})}}/>
                <Typography sx={{ml: "4px", fontFamily: "inherit", fontSize: "inherit"}}>
                  {walletEth}
                </Typography>
                <PaidIcon sx={{ml: "8px", fontSize: "20px"}}/>
                <Typography sx={{ ml: "2px", fontFamily: "inherit", fontSize: "inherit"}}> 
                  {calculateEthToString(walletEth, currency.value)}
                </Typography>
              </Box>
              <Box sx={{mr: 1, alignItems: "center", display: 'flex' }}>
                <EthereumIcon style={{marginRight: "4px", width: "12px", height: '17px', ...(mode === "dark" && { filter: "invert(100%)"})}}/>
                {
                  currency.value !== 0 ?
                  `${getCurrencySymbol(currency.type)} ${Number(currency.value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                  :
                  <CircularProgress color="primary" size={25} sx={{mr: 1, ml: 1}}/>
                }
              </Box>
              <CustomSelect defaultValue={currency.type} onChange={setCurrencyType}>
                  {currencyTypes.map((type, index)=> {
                      return <StyledOption value={type} key={index}>{type}</StyledOption>
                  })}
              </CustomSelect>
            </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddressBar;
