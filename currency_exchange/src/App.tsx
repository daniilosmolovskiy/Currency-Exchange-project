import React, { useState, useEffect } from 'react';
import axios from 'axios'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { ExchangeTable } from './Components/ExchangeTable/ExchangeTable'
import { ExchangeInputs } from './Components/ExchangeInputs/ExchangeInputs'

import { TCurrency, IHeaders, IBuySell } from './types'

const StyledContainer = styled(Container)`
    display: flex;
    justify-content: space-between;
`;

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  tableWrapper: {
    padding: '30px',
    width: 'calc(50% - 90px)'
  },
  table: {
    minWidth: '100%',
  },
  select: {
    width: 'calc(50% - 50px)'
  },
  selectWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column'
  }
});

function App() {

  const [currencys, setCurrencys] = useState<TCurrency[]>([])
  const [resultValue, setResultValue] = useState<number | null>(null)
  const [currentValue, setCurrentValue] = useState<string>('CZK')
  const [buySellChoice, setbuySellChoice] = useState<boolean>(true)
  const classes = useStyles();

  let dateFormat = new Date();
  let dd = String(dateFormat.getDate()).padStart(2, '0');
  let mm = String(dateFormat.getMonth() + 1).padStart(2, '0');
  let yyyy = dateFormat.getFullYear();
  const date = dd + '.' + mm + '.' + yyyy;

  const calculateValue = (passsedValue: number) => {
    const currentCurrency = currencys.find(elem => elem.currency === currentValue)
    const result = passsedValue * (buySellChoice ? currentCurrency!.saleRate : currentCurrency!.purchaseRate);
    setResultValue(result)
  }

  useEffect(() => {
    axios
      .get(`/p24api/exchange_rates?json&date=${date}`).then(({ data }) => {
        const rates = data.exchangeRate.filter((currency: TCurrency) => currency.purchaseRate);
        rates.shift()
        setCurrencys(rates)
      })
  }, [date])

  const headers: IHeaders[] = [
    { name: 'Currency', index: 1 },
    { name: 'Basic currency', index: 2 },
    { name: 'PrivatBank purchase rate', index: 3 },
    { name: 'PrivatBank selling rate', index: 4 }
  ]
  const BuySell: IBuySell[] = [
    { name: 'Buy', index: 1 },
    { name: 'Sell', index: 2 }
  ];

  return (
    <>
      <Typography variant="h3" component="h1" align="center">
        Currency Exchange App
      </Typography>
      <StyledContainer>
        <ExchangeTable classes={classes} currencys={currencys} headers={headers} />
        <ExchangeInputs classes={classes} currencys={currencys} setbuySellChoice={setbuySellChoice} buySellChoice={buySellChoice} BuySell={BuySell} setCurrentValue={setCurrentValue} currentValue={currentValue} calculateValue={calculateValue} resultValue={resultValue} />
      </StyledContainer>
    </>
  );
}

export default App;
