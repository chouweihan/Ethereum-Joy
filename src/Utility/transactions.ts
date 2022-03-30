import { ITransaction, ITransactionFiltered } from "../Interfaces/ITransaction";
import { getGasBigNumber } from "./formatter";
import { BigNumber } from "ethers";

const transactionToFiltered = (data: Array<ITransaction>) : ITransactionFiltered[] => {

    const res : ITransactionFiltered[] = data.map((t) => {
        return {
            blockHash: t.blockHash,
            from: t.from,
            hash: t.hash,
            input: t.input,
            isError: t.isError,
            nonce: t.nonce,
            timeStamp: t.timeStamp,
            to: t.to,
            value: t.value,
            gasSpent: getGasBigNumber(t).toString()
        }
    })

    return res;
}

const filterErrorSuccess = (data: Array<ITransaction>, error: boolean) : ITransaction[] => {
    return [...data.filter((t) => t.isError === (error ? "1" : "0"))];
}

const filterIn = (data: Array<ITransaction>, address: string) : ITransaction[] => {
    return [...data.filter((t) => t.to === address)];
}

const filterOut = (data: Array<ITransaction>, address: string) : ITransaction[] => {
    return [...data.filter((t) => t.to !== address)];
}
 
const sortByBiggestGas = (data: Array<ITransaction>) : ITransaction[] => {
    return [...data].sort((a, b) => { return (getGasBigNumber(a).gte(getGasBigNumber(b))) ? -1 : 1 });
}

const sortByBiggestTransaction = (data: Array<ITransaction>) : ITransaction[] => {
    return [...data].sort((a, b) => { return (BigNumber.from(a.value).gte( BigNumber.from(b.value))) ? -1 : 1 });
}


export {
    transactionToFiltered,
    filterErrorSuccess,
    filterIn,
    filterOut,
    sortByBiggestGas,
    sortByBiggestTransaction
}