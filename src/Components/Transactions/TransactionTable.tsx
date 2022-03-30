import React from 'react'
import { ITransactionFiltered} from '../../Interfaces/ITransaction'
import MUIDataTable, { MUIDataTableOptions, MUIDataTableColumnDef } from "mui-datatables";
import PaginationFooter from "./PaginationFooter"
import { useColorMode } from "../../Contexts/ColorModeContext";
import { DateRow, HashRow, ValueRow, InOutRow, StatusRow } from "./TableFormat"
import { useWallet } from '../../Contexts/WalletContext';




interface ITransactionTable {
  data: Array<ITransactionFiltered>,
}

const TransactionTable = ({ data }: ITransactionTable)  => {
    const { mode } = useColorMode();
    const { wallet: { currency, curAddress } } = useWallet();

    const genericStringToNumberSort = (order: "asc" | "desc") : (obj1: any, obj2: any) => number => {
      return (obj1: any, obj2: any) : number => {
        let eth1 = parseInt(obj1.data, 10);
        let eth2 = parseInt(obj2.data, 10);
        return (eth1 - eth2) * (order === 'asc' ? 1 : -1);
      };
    }


    const filterError = (prop: string, filterValue: any[], row?: any[] | undefined): boolean  => {   
      if(filterValue.length) {
        const err = filterValue[0] === "ERROR" ? "0" : "1"
        return row?.[5] === err;
      }
      return false;
    }

    const inOutFilter = (prop: string, filterValue: any[], row?: any[] | undefined): boolean  => {   
      if(filterValue.length) {
        if(filterValue[0] === "IN")
          return row?.[6] !== curAddress;
        return row?.[6] === curAddress;  
      }
      return false;
    }


    const columns : MUIDataTableColumnDef[] = [
        {
         name: "timeStamp",
         label: "Date",
         options: {
          sort: true,
          sortDescFirst: true,
          filter: false,
          customBodyRender: (timeStamp: string) => {
            return <DateRow timeStamp={timeStamp}/>;
           }
         }     
        },
        {
          name: "hash",
          label: "Transaction",
          options: {
           sort: false,
           filter: false,
           customBodyRender: (hash: string) => {
            return <HashRow hash={hash}/>;
           }
          }     
         },
        {
          name: "value",
          label: "ETH",
          options: {
           sort: true,
           sortDescFirst: true,
           filter: false,
           customBodyRender: (value: string) => {
            return <ValueRow value={value} mode={mode} currency={currency}/>;
           },
           sortCompare: genericStringToNumberSort
          }     
         },
         {
          name: "gasSpent",
          label: "Gas Spent",
          options: {
           sort: true,
           sortDescFirst: true,
           filter: false,
           customBodyRender: (value: string) => {
            return <ValueRow value={value} mode={mode} currency={currency}/>;
           },
           sortCompare: genericStringToNumberSort
          }     
         },
         {
          name: "nonce",
          label: "Nonce",
          options: {
           sort: true,
           sortDescFirst: true,
           filter: false,
           sortCompare: genericStringToNumberSort
          }     
         },   
         {
          name: "isError",
          label: "Status",
          options: {
           sort: false,
           filter: true,
           customFilterListOptions: { render: v => `Status: ${v}` },
           filterOptions: {
             names: ['ERROR', 'SUCCESS'],
             logic: filterError
           },
           customBodyRender: (isError: string) => {
            return <StatusRow isError={isError} mode={mode}/>;
           },
          }
         },   
         {
          name: "to",
          label: "Type",
          options: {
           sort: false,
           filter: true,
           customBodyRender: (to: string) => {
            return <InOutRow to={to} address={curAddress}/>;
           },
           customFilterListOptions: { render: v => `Type: ${v}` },
           filterOptions: {
              names: ["IN", "OUT"],
              logic: inOutFilter

           }
          }     
         }    
       ];

    const options : MUIDataTableOptions = {
        customFooter: (count: number, page:number, rowsPerPage: number, changeRowsPerPage: (row: number) => void,  changePage: (page: number) => void) => {
            return (
              <PaginationFooter
                data={data}
                page={page}
                changePage={changePage}
                changeRowsPerPage={changeRowsPerPage}
                count={count}
                rowsPerPage={rowsPerPage}
              />
            );
          },
          elevation: 2,
          selectableRows: "none"          
    }   

  return (
    <MUIDataTable title={"Transactions"} data={data} columns={columns} options={options} />
  )
}

export default TransactionTable