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

export default function BasicModal({value, patch, id, edited, setEdited}) {
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // const filterValues =[  ]

    const [firstName, setFirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [mobile, setmobile] = useState("")
    const [aadhar, setAadhar] = useState("")

    const firstNameHandler = (event) => {
        setFirstName(event.target.value)
    }
    const lastNameHandler = (event) => {
        setlastName(event.target.value)
    }
    const mobileHandler = (event) => {
        setmobile(event.target.value)
    }
    const aadharHandler = (event) => {
        setAadhar(event.target.value)
    }

    async function uploadToDatabase() {

        const api = `${config.endpoint}/customer`;
        // console.log(api)

        const body = {
            "firstName": firstName,
            "lastName": lastName,
            "mobile": mobile,
            "aadhar": aadhar
        }

        await axios.post(api, body)
            .then((response) => {
                console.log(response.data)
                enqueueSnackbar("Customer Added", { variant: "success" })
                setEdited(!edited)
            })
            .catch((error) => {
                enqueueSnackbar("couldn't able to upload to the database", { variant: "error" })
            })
    }
    async function patchToDatabase() {

        const api = `${config.endpoint}/customer/${id}`;
        // console.log(api)

        const body = {
            "firstName": firstName,
            "lastName": lastName,
            "mobile": mobile,
            "aadhar": aadhar
        }

        await axios.patch(api, body)
            .then((response) => {
                console.log(response.data)
                enqueueSnackbar("Customer patched", { variant: "success" })
                setEdited(!edited)
            })
            .catch((error) => {
                enqueueSnackbar("couldn't able to patch customer details to the database", { variant: "error" })
            })
    }

    const addCustomerToDatabase = () => {

        if( patch === "true" ){
            patchToDatabase();
        }
        else{
            uploadToDatabase();
            
        }
        handleClose();
    }

    // console.log(firstName, lastName, mobile, aadhar)



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
                        {value}
                    </Typography>

                    {/* <FormTextField   /> */}
                    <Box >
                        <TextField
                            required
                            id="outlined-basic"
                            label="First Name"
                            variant="outlined"
                            onChange={firstNameHandler}
                            sx={{ width: "100%", marginBottom: "10px" }}
                        />
                        <TextField
                            id="outlined-basic1"
                            label="last Name"
                            variant="outlined"
                            onChange={lastNameHandler}
                            sx={{ width: "100%", marginBottom: "10px" }}
                        />
                        <TextField
                            id="outlined-basic2"
                            label="Mobile Number"
                            variant="outlined"
                            onChange={mobileHandler}
                            sx={{ width: "100%", marginBottom: "10px" }}
                        />
                        <TextField
                            id="outlined-basic3"
                            label="Aadhar Number"
                            variant="outlined"
                            onChange={aadharHandler}
                            sx={{ width: "100%", marginBottom: "10px" }}
                        />

                        <Button onClick={addCustomerToDatabase} variant="contained" gutterBottom>Add Customer</Button>

                    </Box>
                </Box>
            </Modal>
        </>
    );
}
