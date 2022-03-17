import React, { useEffect, useState, useReducer } from "react";
import { useWallet } from "../Contexts/WalletContext";
import { ITransaction } from "../Interfaces/ITransaction";
import { Button, Typography, useTheme  } from "@mui/material";
import { transactionReducer } from "../Reducers/TransactionReducer";
import TransactionTable from "../Components/Transactions/TransactionTable";

const initialTransactions: Array<ITransaction> = []; 

const TransactionPage = () => {
  const [filteredTransactions, dispatch] = useReducer(transactionReducer, initialTransactions);

  const {
    wallet: { curAddress, transactions },
  } = useWallet();
  const theme = useTheme();

  useEffect(() => {
      dispatch({type: "setTransactions", payload: transactions})
  }, [transactions])

  return (
    <div>
        <TransactionTable transactions={filteredTransactions} dispatch={dispatch} />
    </div>
  );
};

export default TransactionPage;
