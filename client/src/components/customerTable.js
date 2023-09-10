import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BasicModal from './BasicModal';
import { Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useSnackbar } from 'notistack'
import { config } from '../App';

export default function CustomerTable({ customersDetails, edited, setEdited }) {

    const { enqueueSnackbar } = useSnackbar();

    async function deleteCustomer(id) {

        const api = `${config.endpoint}/customer/${id}`;
        try {
            const response = await axios.delete(api);
            // console.log(response.data);
            enqueueSnackbar("customer deleted successfully", { variant: "success" });
            setEdited(!edited);
        } catch (error) {
            enqueueSnackbar("couldn't able to delete customer", { variant: "error" });
        }
    }

    const handleDeleteCustomer = (event) => {
        console.log(event.currentTarget.id)
        let custId = event.currentTarget.id;
        deleteCustomer(custId)
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                    {
                        customersDetails.length !== 0
                            ?
                            customersDetails.map((row) => (
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
                                        <BasicModal value="Edit" patch="true" id={row._id} customerDetailsFromCustomerTable={row} edited={edited} setEdited={setEdited} />
                                    </TableCell>
                                    <TableCell align="right" onClick={handleDeleteCustomer} id={row._id} ><DeleteIcon color='error' /></TableCell>
                                </TableRow>
                            ))

                            :
                            <Typography sx={{ display: "flex", justifyContent: "center" }} variant='overline' gutterBottom>
                                Oops!!, No Customers Found
                            </Typography>
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

