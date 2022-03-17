
import React, { useContext, useReducer, ReactNode, useEffect } from "react";
import axios from "axios";
import { IWallet, IWalletContextState, TCurrencyTypes } from "../Interfaces/IWallet";
import { walletReducer } from "../Reducers/WalletReducer";
import { useSnackbar } from "notistack";
import { APIStatus } from "../Interfaces/IGeneral";
const initialState: IWallet = {
    address: "",
    curAddress: "",
    inputAddress: "",
    currency: {type: getLocalStorageCurrency(), value: 0},
    loading: false,
    transactionStatus: APIStatus.STANDBY,
    transactions: []
};

const WalletContext = React.createContext<IWalletContextState>({
  wallet: initialState,
  setAddress: () => null,
  setCurAddress: () => null,
  setCurrencyType: () => null,
  setInputAddress: () => null,
  fetchTransactions: () => null
}); 

function getLocalStorageCurrency() : TCurrencyTypes {
    let type: TCurrencyTypes = localStorage.getItem("currencyType") as TCurrencyTypes;
    if(!type) type = "CAD";
    return type;
}


export const WalletProvider = ({children} : { children: ReactNode }) => {
  const [state, dispatch] = useReducer(walletReducer, initialState);
  const { enqueueSnackbar } = useSnackbar();

  const setAddress = (address: string) => {
    dispatch({type: "setLoading"});
    dispatch({type: "setAddress", payload: address});
    setCurAddress(address);
  }

  const setCurAddress = (curAddress: string) => {
    dispatch({type: "setLoading"});
    dispatch({type: "setCurAddress", payload: curAddress});
  }

  const setCurrencyType = (type: TCurrencyTypes) => {
    localStorage.setItem("currencyType", type);
    dispatch({type: "setCurrencyType", payload: type});
  }

  const setInputAddress = (address: string) => {
    dispatch({ type: "setInputAddress", payload: address })
  }
 
  const setCurrencyValue = (type: TCurrencyTypes) => {
    axios.get(`https://api.coinbase.com/v2/exchange-rates?currency=ETH`).then(
      ({
        data: {
          data: { rates },
        },
      }) => {
        dispatch({type: "setCurrencyValue", payload: rates[type]})
      });
  }

  const fetchTransactions = () => {
    dispatch({ type: "setLoading" });
    dispatch({ type: "setTransactionStatus", payload: APIStatus.LOADING })
    axios
        .get(
          `https://api.etherscan.io/api?module=account&action=txlist&address=${state.curAddress}&startblock=0&endblock=99999999&sort=desc&apikey=${process.env.REACT_APP_ETHERSCAN_KEY}`
        )
        .then(({data}) => {
          if(data.status === "1") {
            dispatch({ type: "setTransactions", payload: data.result })
            enqueueSnackbar("Fetching transaction succesful", {
              variant: "success",
              autoHideDuration: 3000,
            })
            dispatch({ type: "setTransactionStatus", payload: APIStatus.SUCCESS })
          }
          else {
            throw new Error("invalid api fetch");
          }
        })
        .catch((err) => {
            dispatch({type: "endLoading"})
            dispatch({ type: "setTransactions", payload: []})
            enqueueSnackbar("Failed to fetch transactions", {
              variant: "error",
              autoHideDuration: 3000,
            })
            dispatch({ type: "setTransactionStatus", payload: APIStatus.FAIL })
        });
  }

  useEffect(() => {
    if(state.curAddress) {
        fetchTransactions();
    }
    // eslint-disable-next-line
  }, [state.curAddress])

  useEffect(() => {
    setCurrencyValue(state.currency.type);
  }, [state.currency.type])


  return (
    <WalletContext.Provider
      value={{
        wallet: {...state},
        setAddress,
        setCurAddress,
        setInputAddress,
        setCurrencyType,
        fetchTransactions
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  return useContext(WalletContext);
};  