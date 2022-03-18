import React, { useEffect, useState, useReducer } from "react";
import { useWallet } from "../Contexts/WalletContext";
import { ITransaction, ITransactionState } from "../Interfaces/ITransaction";
import { Button, Typography, useTheme  } from "@mui/material";
import { transactionReducer } from "../Reducers/TransactionReducer";
import TransactionTable from "../Components/Transactions/TransactionTable";

const initialTransactions: ITransactionState = {
    original: [],
    filtered: []
}; 

const TransactionPage = () => {
  const [stateTransactions, dispatch] = useReducer(transactionReducer, initialTransactions);

  const {
    wallet: { curAddress, transactions },
  } = useWallet();
  const theme = useTheme();

  useEffect(() => {
      dispatch({type: "setTransactions", payload: transactions})
  }, [transactions])


  

  return (
    <div>
        <TransactionTable stateTransactions={stateTransactions} dispatch={dispatch} />
    </div>
  );
};

export default TransactionPage;
