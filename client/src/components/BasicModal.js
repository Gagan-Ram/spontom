import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { config } from '../App';
import axios from 'axios';
import { useSnackbar } from 'notistack'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal({ value, patch, id, edited, setEdited, customerDetailsFromCustomerTable }) {
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Initialize state variables with values from customerDetailsFromCustomerTable so that we can able to Edit if needed 
    const [firstName, setFirstName] = useState(customerDetailsFromCustomerTable ? customerDetailsFromCustomerTable.firstName : "");
    const [lastName, setLastName] = useState(customerDetailsFromCustomerTable ? customerDetailsFromCustomerTable.lastName : "");
    const [mobile, setMobile] = useState(customerDetailsFromCustomerTable ? customerDetailsFromCustomerTable.mobile : "");
    const [aadhar, setAadhar] = useState(customerDetailsFromCustomerTable ? customerDetailsFromCustomerTable.aadhar : "");

    const firstNameHandler = (event) => {
        setFirstName(event.target.value);
    };
    const lastNameHandler = (event) => {
        setLastName(event.target.value);
    };
    const mobileHandler = (event) => {
        setMobile(event.target.value);
    };
    const aadharHandler = (event) => {
        setAadhar(event.target.value);
    };

    async function uploadToDatabase() {
        const api = `${config.endpoint}/customer`;

        const body = {
            "firstName": firstName,
            "lastName": lastName,
            "mobile": mobile,
            "aadhar": aadhar
        };

        try {
            const response = await axios.post(api, body);
            console.log(response.data);
            enqueueSnackbar("Customer Added", { variant: "success" });
            setEdited(!edited);
        } catch (error) {
            const errormessage = error.response.data.message ? error.response.data.message : error.response.data.details[0].message
            enqueueSnackbar(errormessage, { variant: "error" });
        }
    }

    async function patchToDatabase() {
        const api = `${config.endpoint}/customer/${id}`;

        const body = {
            "firstName": firstName,
            "lastName": lastName,
            "mobile": mobile,
            "aadhar": aadhar
        };

        try {
            const response = await axios.patch(api, body)
            console.log(response.data);
            enqueueSnackbar("Customer patched", { variant: "success" });
            setEdited(!edited);

        } catch (error) {
            // console.log("hihi")
            const errormessage = error.response.data.message ? error.response.data.message : error.response.data.details[0].message
            enqueueSnackbar(errormessage, { variant: "error" });
        }
    }

    const addCustomerToDatabase = () => {
        if (patch === "true") {
            patchToDatabase();
        } else {
            uploadToDatabase();
            setFirstName('')
            setLastName('')
            setMobile('')
            setAadhar('')
        }
        handleClose();
    }

    return (
        <>
            <Button variant="outlined" onClick={handleOpen} style={{ marginLeft: '10px' }}>{value}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{ textAlign: "center" }} id="modal-modal-title" variant="h6" component="h2">
                        {
                            value === "Edit" ? `${value} Customer` : value
                        }
                    </Typography>
                    <Box>
                        <TextField
                            required
                            id="outlined-basic"
                            label="First Name"
                            variant="outlined"
                            value={firstName}
                            onChange={firstNameHandler}
                            sx={{ width: "100%", marginBottom: "10px" }}
                        />
                        <TextField
                            id="outlined-basic1"
                            label="Last Name"
                            variant="outlined"
                            value={lastName}
                            onChange={lastNameHandler}
                            sx={{ width: "100%", marginBottom: "10px" }}
                        />
                        <TextField
                            id="outlined-basic2"
                            label="Mobile Number"
                            variant="outlined"
                            value={mobile}
                            onChange={mobileHandler}
                            sx={{ width: "100%", marginBottom: "10px" }}
                        />
                        <TextField
                            id="outlined-basic3"
                            label="Aadhar Number"
                            variant="outlined"
                            value={aadhar}
                            onChange={aadharHandler}
                            sx={{ width: "100%", marginBottom: "10px" }}
                        />
                        <Button onClick={addCustomerToDatabase} variant="contained" gutterBottom>
                            {
                                value === "Edit" ? `${value} Customer` : value
                            }
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
