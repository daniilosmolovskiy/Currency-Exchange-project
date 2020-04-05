export type TCurrency = {
  currency: string;
  baseCurrency: string;
  saleRate: number;
  purchaseRate: number;
}

export interface IHeaders {
  name: string,
  index: number
}

export interface IBuySell {
  name: string,
  index: number
}

export interface IExchangeTable {
  classes: any,
  headers: IHeaders[],
  currencys: TCurrency[]
}

export interface IExchangeInputs {
  classes: any,
  currencys: TCurrency[],
  BuySell: IBuySell[],
  resultValue: number | null
}

export interface IReducer {
  buySellChoice: boolean,
  currentValue: string,
  resultValue: number | null
}