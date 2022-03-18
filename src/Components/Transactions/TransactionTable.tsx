import React, { useEffect } from "react";
import { ITransaction, ITransactionState } from "../../Interfaces/ITransaction";
import { useTheme, Typography } from "@mui/material";
import { useWallet } from "../../Contexts/WalletContext";
import { Actions } from "../../Reducers/TransactionReducer"
import { getGasEthString, weiToEthString4D, getTimestampToDate  } from "../../Utility/formatter"

type TransactionTableProps = {
    stateTransactions: ITransactionState
    dispatch: React.Dispatch<Actions>
}

const TransactionTable = ({ stateTransactions: { original, filtered }, dispatch } : TransactionTableProps ) => {
    const { wallet: { curAddress, transactions } } = useWallet();
    const theme = useTheme(); 

    return (
        <div>
            {/* <button onClick={()=> {dispatch({type: "sortByOldest" })}}> sortOldest </button>
            <button onClick={()=> {dispatch({type: "sortByLatest"})}}>sortNewest</button>
            <button onClick={()=> {dispatch({type: "clearFilters" })}}> clearFilters </button>
            <button onClick={()=> {dispatch({type: "filterIn", payload: curAddress})}}>filter by IN</button>
            <button onClick={()=> {dispatch({type: "filterOut", payload: curAddress})}}>filter by OUT</button>
            <button onClick={()=> {dispatch({type: "sortSmallestGas"})}}>sort by gas smallest</button>
            <button onClick={()=> {dispatch({type: "sortBiggestGas"})}}>sort by gas biggest</button>
            <button onClick={()=> {dispatch({type: "sortSmallestTransaction"})}}>sort by smallest</button>
            <button onClick={()=> {dispatch({type: "sortBiggestTransaction"})}}>sort by biggest</button>
            <button onClick={() => {dispatch({type: "reverseTable"})}}>reverse sort</button>
            <button onClick={()=> {dispatch({type: "filterErrors"})}}>filter errors</button> */}
            {filtered.map((t, index) => {
                return <div key={index}>{index} transaction value: {weiToEthString4D(t.value)} gas: {getGasEthString(t)} to: {t.to}
                date: {getTimestampToDate(t.timeStamp)}
                </div>
            })}
        </div>
    );
};

export default TransactionTable;
