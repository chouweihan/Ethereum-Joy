import React from "react";
import { ITransaction } from "../../Interfaces/ITransaction";
import { useTheme, Typography } from "@mui/material";
import { useWallet } from "../../Contexts/WalletContext";
import { Actions } from "../../Reducers/TransactionReducer"

type TransactionTableProps = {
    transactions: ITransaction[]
    dispatch: React.Dispatch<Actions>
}

const TransactionTable = ({ transactions, dispatch } : TransactionTableProps ) => {
    const { wallet: { curAddress } } = useWallet();
    const theme = useTheme(); 

    return (
        <div>
        
        </div>
    );
};

export default TransactionTable;
