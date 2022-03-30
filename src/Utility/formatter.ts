import { BigNumber, ethers } from "ethers";
import { ITransaction } from "../Interfaces/ITransaction";

export const formatAddress = (address: string): string => {
  return `${address.slice(0, 4)}...${address.slice(address.length - 4, address.length)}`;
};

export const calculateEthToString = (ethValue: string, currencyValue: number) : string => {
    return (currencyValue * Number(ethValue)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const calculateWeiToString = (weiValue: string, currencyValue: number): string => {
  return calculateEthToString(weiToEthString4D(weiValue), currencyValue);
}

export const weiToEthString4D = (wei: string) : string => {
    let eth = ethers.utils.formatEther(wei);
    return splitEth(eth);
}

export const splitEth = (eth: string) : string => {
  const split = eth.split(".");
          if (split.length > 1 && split[1].length >= 5) {
            eth = split[0] + "." + split[1].substring(0, 4);
          }
  return eth;
}

export const getGasEthString = (transaction: ITransaction) : string => {
  return ethers.utils.formatEther(BigNumber.from(transaction.gasPrice).mul(BigNumber.from(transaction.gasUsed)));
}

export const getGasBigNumber = (transaction: ITransaction) : BigNumber => {
  return BigNumber.from(transaction.gasPrice).mul(BigNumber.from(transaction.gasUsed));
}

export const getTimestampToDate = (timestamp: string) : Date => {
  const d = new Date(0);
  d.setUTCSeconds(Number(timestamp))
  return d;
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const formatTimeStampToStringDate = (timeStamp: string) : string => {
  const d = getTimestampToDate(timeStamp);
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${month} ${date < 10 ? "0" : ""}${date}, ${year}`;
}

export function formatAMPM(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const strMinutes = minutes < 10 ? '0'+minutes : minutes;
  return hours + ':' + strMinutes + ' ' + ampm;
}

export const getMethodSignature = (input: string) : string => {
  return input.slice(0, input.length >= 10 ? 10 : input.length);
}