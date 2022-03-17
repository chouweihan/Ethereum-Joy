import {currencyTypes} from "../Assets/Data/CurrencyTypes";
import { APIStatus } from "./IGeneral";
import { ITransaction } from "./ITransaction";
export interface IWallet {
    // address provided by metamask
    address: string
    // current address being loaded
    curAddress: string
    // address being entered
    inputAddress: string
    currency: ICurrency
    loading: boolean,
    transactionStatus: APIStatus,
    transactions: Array<ITransaction>
}

export type TCurrencyTypes = typeof currencyTypes[number];

export interface ICurrency {
    type: TCurrencyTypes
    value: number
}

export interface IWalletContextState {
    wallet: IWallet;
    setAddress: (address: string) => void;
    setCurAddress: (curAddress: string) => void;
    setCurrencyType: (type: TCurrencyTypes) => void;
    setInputAddress: ( address: string) => void;
    fetchTransactions: () => void;
}