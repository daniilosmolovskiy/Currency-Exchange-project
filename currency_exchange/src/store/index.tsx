import { createContext } from 'react'

export function currencyReducer(state: any, action: any) {
  switch (action.type) {
    case 'changeBuySell': {
      return {
        ...state,
        buySellChoice: !state.buySellChoice,
        resultValue: 0
      };
    }
    case 'changeCurrentCurrency': {
      return {
        ...state,
        currentValue: action.value
      }
    }
    case 'changeResultValue': {
      return {
        ...state,
        resultValue: action.value
      }
    }
    default:
      return state;
  }
}

export const initialState = {
  buySellChoice: true,
  currentValue: 'CZK',
  resultValue: null,

};

export const Context = createContext(initialState.buySellChoice)