import React from "react";
import { formatTimeStampToStringDate, getTimestampToDate, formatAMPM, getMethodSignature, weiToEthString4D, calculateWeiToString } from "../../Utility/formatter";
import { Box, Link, Tooltip } from "@mui/material";
import { ICurrency } from "../../Interfaces/IWallet";
import { getCurrencySymbol } from "../../Utility/currency";
import EthIcon from "../Shared/EthIcon";

export const DateRow = ({ timeStamp }: { timeStamp: string }) => {
  return (
    <Box display="flex" sx={{ whiteSpace: "nowrap" }}>
      <Box sx={{ width: 100, mr: 1 / 2 }}>
        {formatTimeStampToStringDate(timeStamp)}
      </Box>
      {formatAMPM(getTimestampToDate(timeStamp))}
    </Box>
  );
};

export const MethodRow = ({ input }: { input: string }) => {
  
  return <Box>{getMethodSignature(input)}</Box>;
};


export const HashRow = ({ hash }: { hash: string }) => {
  return (
    <Tooltip title={`https://etherscan.io/tx/${hash}`}>
        <Link href={`https://etherscan.io/tx/${hash}`} target="_blank" underline="none">{hash.substring(0, 15)}...</Link>
    </Tooltip>
  );
}

interface IValueRow {
  value: string,
  mode: "dark" | "light",
  currency: ICurrency
}

export const ValueRow = ({ value, mode, currency }: IValueRow) => {
  return (
    <Tooltip title={`${getCurrencySymbol(currency.type)} ${calculateWeiToString(value, currency.value)}`} sx={{cursor: "help"}} placement="right">
        <Box alignItems="center" display="inline-flex">
          <EthIcon style={{ marginRight: "10px" }}/>
      
          {weiToEthString4D(value)}
        </Box>      
    </Tooltip>
  )
}

export const InOutRow = ({ to, address }: { to: string, address: string}) => {
  const inout: boolean = (to === address);

  return (
    <Box display="inline-block">
      <Box sx={{
        background:  inout ? "rgba(0, 201, 167, 0.2)" : "rgba(219, 154, 4, 0.2)",
        color: inout ? "rgb(2, 151, 126)" : "rgb(180, 125, 0)",
        borderRadius: "5.6px",
        padding: ".2rem .5rem"
      }}>
        {inout ? "IN" : "OUT"}
      </Box>
    </Box>
  )
}

export const StatusRow = ({ isError, mode }: { isError: string, mode: "light" | "dark"}) => {
  const error: boolean = isError === "1";

  return (
    <Box display="inline-block">
      <Box sx={{
        ...(mode === "dark" ? {
          background:  error ? "rgba(197, 147, 147, 0.795)" : "rgba(153, 202, 194, 0.795)",
          color: error ?"rgb(90, 1, 1)": "rgb(2, 85, 71)"
        } :
        {
          background:  error ? "rgba(201, 0, 0, 0.2)" : "rgba(0, 201, 167, 0.2)",
          color: error ?"rgb(151, 2, 2)": "rgb(2, 151, 126)"
        }),
        
        borderRadius: "5.6px",
        padding: ".2rem .5rem"
      }}>
        {error ? "error" : "success"}
      </Box>
    </Box>
  )
}


