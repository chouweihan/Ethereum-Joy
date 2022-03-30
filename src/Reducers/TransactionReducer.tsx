import { ITransaction } from "../Interfaces/ITransaction";
import { BigNumber } from "ethers";
import { getGasBigNumber } from "../Utility/formatter";

interface ITransactionState {
  original: ITransaction[],
  filtered: ITransaction[]
}

export type Actions = 
| { type: "setTransactions"; payload: Array<ITransaction> }
| { type: "reverseTable" }
| { type: "sortBiggestTransaction" }
| { type: "sortSmallestTransaction"}
| { type: "sortBiggestGas" }
| { type: "sortSmallestGas" }
| { type: "sortByLatest" }
| { type: "sortByOldest" }
| { type: "clearFilters"}
| { type: "filterErrors" }
| { type: "filterOut", payload: string}
| { type: "filterIn", payload: string}
;


export const transactionReducer = (state: ITransactionState, action: Actions) => {
  switch (action.type) {

    case "clearFilters": {
      return {
        ...state,
        filtered: [...state.original]
      }
    }

    case "setTransactions": {
      return {
        original: [...action.payload],
        filtered: [...action.payload]
      };
    }

    case "reverseTable": {
      const reversed = [...state.filtered].reverse();
      return {
        ...state,
        filtered: [...reversed]
      }
    }

    case "sortBiggestTransaction": {
      const copy = [...state.filtered].sort((a, b) => { return (BigNumber.from(a.value).gte( BigNumber.from(b.value))) ? -1 : 1 });
      return {
        ...state,
        filtered: [...copy]
      }
    }

    case "sortSmallestTransaction": {
      const copy = [...state.filtered].sort((a, b) => { return (BigNumber.from(a.value).gte( BigNumber.from(b.value))) ? 1 : -1 });

      return {
        ...state,
        filtered: [...copy]
      }
    }

    case "sortBiggestGas": {
      const copy = [...state.filtered].sort((a, b) => { return (getGasBigNumber(a).gte(getGasBigNumber(b))) ? -1 : 1 });

      return {
        ...state,
        filtered: [...copy]
      }
    }

    case "sortByOldest": {
      const copy = [...state.filtered].sort((a, b) => { return Number(a.timeStamp) - Number(b.timeStamp)});
      return {
        ...state,
        filtered: [...copy]
      }
    }

    case "sortByLatest": {
      const copy = [...state.filtered].sort((a, b) => { return Number(b.timeStamp) - Number(a.timeStamp)});
      return {
        ...state,
        filtered: [...copy]
      }
    }

    case "sortSmallestGas": {
      const copy = [...state.filtered].sort((a, b) => { return (getGasBigNumber(a).gte(getGasBigNumber(b))) ? 1 : -1 });

      return {
        ...state,
        filtered: [...copy]
      }
    }

    case "filterErrors": {
      return {
        ...state,
        filtered: [...state.filtered.filter((t) => t.isError === "1")]
      };
    }

    case "filterOut": {
      return {
        ...state,
        filtered: [...state.filtered.filter((t) => t.to !== action.payload)]
      };
    }

    case "filterIn": {
      return {
        ...state,
        filtered: [...state.filtered.filter((t) => t.to === action.payload)]
      };
    }

    default:
      return {
        ...state,
      };
  }
};
