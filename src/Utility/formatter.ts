import { ethers } from "ethers";

export const formatAddress = (address: string): string => {
  return `${address.slice(0, 4)}...${address.slice(address.length - 4, address.length)}`;
};

export const calculateEthToString = (ethValue: string, currencyValue: number) : string => {
    return (currencyValue * Number(ethValue)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const formatEthToFourPoints = (wei: string) : string => {
    let eth = ethers.utils.formatEther(wei);
    const split = eth.split(".");
          if (split.length > 0 && split[1].length >= 5) {
            eth = split[0] + "." + split[1].substring(0, 4);
          }
    return eth;
}