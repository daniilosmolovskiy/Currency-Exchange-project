import React from 'react'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import { IExchangeInputs } from '../../types'

export const ExchangeInputs: React.FC<IExchangeInputs> = ({ classes, currencys, setbuySellChoice, buySellChoice, BuySell, setCurrentValue, currentValue, calculateValue, resultValue }) => {
  return (
    <Paper className={classes.tableWrapper} elevation={2}>
      <form noValidate autoComplete="off">
        <div className={classes.form}>
          <div className={classes.selectWrapper}>
            <TextField
              className={classes.select}
              id="standard-select-currency-native"
              select
              onChange={() => { setbuySellChoice(!buySellChoice) }}
              SelectProps={{
                native: true,
              }}
              helperText="Buy or Sell?"
            >
              {BuySell.map((option): any => (
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
                const selectedCurrency = e.target.value
                setCurrentValue(selectedCurrency)
              }}
              SelectProps={{
                native: true,
              }}
              helperText="Please select currency"
            >
              {currencys.map((currency: any, i: any) => (
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