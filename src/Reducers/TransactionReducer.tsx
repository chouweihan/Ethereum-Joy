import { ITransaction } from "../Interfaces/ITransaction";

export type Actions = { type: "setTransactions"; payload: Array<ITransaction> };

export const transactionReducer = (state: Array<ITransaction>, action: Actions) => {
  switch (action.type) {

    case "setTransactions": {
      return [
        ...action.payload,
      ];
    }

    default:
      return [
        ...state,
      ];
  }
};
