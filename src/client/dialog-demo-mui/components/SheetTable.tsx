import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

type sheetRow = {
  sheetName: string;
  goToButton: React.ReactNode;
  deleteButton: React.ReactNode;
};

export default function SheetTable({ rows }: { rows: Array<sheetRow> }) {
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sheet Name</TableCell>
            <TableCell align="center">Go To</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: sheetRow) => (
            <TableRow
              key={row.sheetName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.sheetName}
              </TableCell>
              <TableCell align="center">{row.goToButton}</TableCell>
              <TableCell align="center">{row.deleteButton}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
