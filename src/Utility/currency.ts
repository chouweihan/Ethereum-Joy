import { TCurrencyTypes } from "../Interfaces/IWallet";
import { CurrencySymbol } from "../Assets/Data/CurrencyTypes";

export function getCurrencySymbol(type: TCurrencyTypes) : string  {
    return CurrencySymbol[type];
}