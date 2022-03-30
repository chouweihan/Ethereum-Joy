import React, { useEffect, useState } from "react";
import { useWallet } from "../Contexts/WalletContext";
import {  ITransactionFiltered } from "../Interfaces/ITransaction";
import {  useTheme, Stack, Alert, Collapse  } from "@mui/material";
import TransactionTable from "../Components/Transactions/TransactionTable";
import { transactionToFiltered } from "../Utility/transactions";
import PleaseConnect from "../Components/Shared/PleaseConnect";
import Loader from "../Components/Shared/Loader";

const TransactionPage = () => {
  const [filteredTransactions, setFilteredTransactions] = useState<Array<ITransactionFiltered>>([]);
  const [etherAlert, setEtherAlert] = useState<boolean>(true);

  const {
    wallet: { curAddress, transactions, loading },
  } = useWallet();
  const theme = useTheme();


  useEffect(() => {
    if(transactions) {
      setFilteredTransactions(transactionToFiltered(transactions));
    }
  }, [transactions])

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

  return (
    <Stack spacing={etherAlert ? 3 : 0}>
      <Collapse in={etherAlert}>
        <Alert variant="outlined" severity="info" onClose={() => {setEtherAlert(false)}}>This site uses Etherscans API. Only the first 10,000 <b>normal</b> transactions will be fetched.</Alert>
      </Collapse>
      {
        filteredTransactions.length === 0 &&
        <Alert severity="warning" variant="outlined">
          No transactions exist for this address
        </Alert>
      }
      <TransactionTable data={filteredTransactions} />
    </Stack>
  );
};

export default TransactionPage;
