import React from 'react'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { TCurrency } from '../../types'
import { IExchangeTable, IHeaders } from '../../types'

export const ExchangeTable: React.FC<IExchangeTable> = ({ classes, headers, currencys }) => {
  return (
    <Paper className={classes.tableWrapper} elevation={2}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map((header: IHeaders) => {
                return (
                  <TableCell align="center" key={header.name}>{header.name}</TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {currencys.map(({ currency, baseCurrency, saleRate, purchaseRate }: TCurrency, i: number) => (
              <TableRow key={i}>
                <TableCell align="center">{currency}</TableCell>
                <TableCell align="center">{baseCurrency}</TableCell>
                <TableCell align="center">{purchaseRate}</TableCell>
                <TableCell align="center">{saleRate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}