import React, {useReducer } from 'react'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import { initialState, currencyReducer} from '../../store/index'

import { IExchangeInputs, TCurrency } from '../../types'

export const ExchangeInputs: React.FC<IExchangeInputs> = ({ classes, currencys, BuySell }) => {


  const calculateValue = (passsedValue: number) => {
    const currentCurrency = currencys.find(elem => elem.currency === currentValue)
    const result = passsedValue * (buySellChoice ? currentCurrency!.saleRate : currentCurrency!.purchaseRate);
    dispatch({type: 'changeResultValue', fieldName: 'resultValue', value: result})
  }

  const [state, dispatch] = useReducer(currencyReducer, initialState);
  const { currentValue, resultValue, buySellChoice } = state;

  return (
    <Paper className={classes.tableWrapper} elevation={2}>
      <form noValidate autoComplete="off">
        <div className={classes.form}>
          <div className={classes.selectWrapper}>
            <TextField
              className={classes.select}
              id="standard-select-currency-native"
              select
              onChange={() => { dispatch({ type: 'changeBuySell' }) }}
              SelectProps={{
                native: true,
              }}
              helperText="Buy or Sell?"
            >
              {BuySell.map((option) => (
                <option key={option.index} value={option.name}>
                  {option.name}
                </option>
              ))}
            </TextField>
            <TextField
              className={classes.select}
              id="standard-select-currency-native"
              select
              value={currentValue}
              onChange={(e) => {
                dispatch({type: 'changeCurrentCurrency', fieldName: 'currentValue', value: e.currentTarget.value})
              }}
              SelectProps={{
                native: true,
              }}
              helperText="Please select currency"
            >
              {currencys.map((currency: TCurrency, i: number) => (
                <option key={i} value={currency.currency}>
                  {currency.currency}
                </option>
              ))}
            </TextField>
          </div>
          <TextField
            type="number"
            required id="standard-required" label="Input value" onChange={(e) => {
              let currentValue = +e.target.value;
              if (currentValue === 0) {
                currentValue = 1
              }
              calculateValue(currentValue)
            }} defaultValue={0}
          />
        </div>
      </form>
      <Typography variant="h5" component="h5" align="center">
        {resultValue !== null ? resultValue.toFixed(2) + ' UAH' : null}
      </Typography>
    </Paper>
  )
}