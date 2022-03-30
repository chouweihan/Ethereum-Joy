import React,  { useCallback, useEffect }  from 'react'
import { filterOut, sortByBiggestGas } from '../../Utility/transactions';
import { useWallet } from '../../Contexts/WalletContext';

const GeneralGasCard = () => {

    const {
      wallet: { curAddress, transactions, currency: { type, value } },
    } = useWallet();


    
    const computeGasInfo = useCallback(() => {
        if(transactions.length > 0) {
            const outgoingTransactions = filterOut(transactions, curAddress);
            const sortedTransactions = sortByBiggestGas(outgoingTransactions);
           
        }
    // eslint-disable-next-line
    }, [transactions])
  
    useEffect(() => {
            computeGasInfo();
    }, [transactions, computeGasInfo])

  return (
    <div>GeneralGasCard</div>
  )
}

export default GeneralGasCard