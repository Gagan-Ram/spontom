import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BasicModal from './BasicModal';

export default function CustomerTable({ customersDetails}) {



    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}  aria-label="simple table">
                <TableHead  >
                    <TableRow>
                        <TableCell style={{ fontWeight: 700 }}>Unique ID</TableCell>
                        <TableCell align="right" style={{ fontWeight: 700 }}>Name</TableCell>
                        <TableCell align="right" style={{ fontWeight: 700 }}>Mobile Number</TableCell>
                        <TableCell align="right" style={{ fontWeight: 700 }}>Aadhar</TableCell>
                        <TableCell align="right" style={{ fontWeight: 700 }}>Action</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {customersDetails.map((row) => (
                        <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.uniqueId}
                            </TableCell>
                            <TableCell align="right">{row.firstName + " " + row.lastName}</TableCell>
                            <TableCell align="right">{"+91 " + row.mobile}</TableCell>
                            <TableCell align="right">{row.aadhar}</TableCell>
                            <TableCell align="right" >
                                <BasicModal value="Edit" patch="true" id={row._id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

