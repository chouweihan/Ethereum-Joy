export interface ITransaction {
    blockHash: string
    blockNumber: string
    confirmations: string
    contractAddress: string
    cumulativeGasUsed: string
    from: string
    gas: string
    gasPrice: string
    gasUsed: string
    hash: string
    input: string
    isError: string
    nonce: string
    timeStamp: string
    to: string
    transactionIndex: string
    txreceipt_status: string
    value: string
}


export interface ITransactionState {
    original: Array<ITransaction>
    filtered: Array<ITransaction>    
}