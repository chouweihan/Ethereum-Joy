import { APIStatus } from "../Interfaces/IGeneral";
import { ITransaction } from "../Interfaces/ITransaction";
import { IWallet, TCurrencyTypes } from "../Interfaces/IWallet";

type Actions =
  | { type: "setAddress"; payload: string }
  | { type: "setInputAddress"; payload: string}
  | { type: "setCurAddress"; payload: string }
  | { type: "setLoading" }
  | { type: "endLoading" }
  | { type: "setCurrencyType"; payload: TCurrencyTypes }
  | { type: "setCurrencyValue"; payload: number}
  | { type: "setTransactions"; payload: Array<ITransaction> }
  | { type: "setTransactionStatus"; payload: APIStatus};

export const walletReducer = (state: IWallet, action: Actions) => {
  switch (action.type) {
    case "setAddress": {
      return {
        ...state,
        address: action.payload,
      };
    }

    case "setTransactionStatus": {
      return {
        ...state,
        transactionStatus: action.payload
      };
    }

    case "setTransactions": {
      return {
        ...state,
        loading: false,
        transactions: action.payload
      }
    }

    case "setInputAddress": {
      return {
        ...state,
        inputAddress: action.payload,
      };
    }

    case "setCurAddress": {
      return {
        ...state,
        curAddress: action.payload,
      };
    }

    case "setCurrencyType": {
      return {
        ...state,
        currency: { type: action.payload, value: 0 }
      };
    }

    case "setCurrencyValue": {
      return {
        ...state,
        currency: { type: state.currency.type, value: action.payload }
      };
    }

    case "setLoading": {
      return {
        ...state,
        loading: true
      };
    }

    case "endLoading": {
      return {
        ...state,
        loading: false
      };
    }

    default:
      return {
        ...state,
      };
  }
};
