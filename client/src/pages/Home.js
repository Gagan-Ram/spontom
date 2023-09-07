import React, { Fragment, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import CustomerTable from '../components/customerTable';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import BasicModal from '../components/BasicModal';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { config } from '../App';

const border = "1px solid black";

const SearchBar = (props) => {
    return (
        <InputBase className={props.classes}
            sx={{
                ml: 1,
                flex: 1,
                width: props.classes === "mobile" ? 700 : "100%",
                bgcolor: "white",
                color: "black",
                border: border,
                borderRadius: 2,
                paddingLeft: 2,
                paddingRight: 2,
            }}
            placeholder="Search using mobile number"
            onChange={props.searchHandler}
            endAdornment={<SearchIcon />}
        />
    );
}

export default function Home() {
    const { enqueueSnackbar } = useSnackbar();

    const [searchForCustomer, setSearchForCustomer] = useState(false);
    const [edited, setEdited] = useState(false);
    const [mobileNumber, setMobileNumber] = useState('');
    const [filteredCustomers, setFilteredCustomers] = useState([]);

    const searchHandler = (event) => {
        const value = event.target.value;
        if (value.length === 10) {
            setMobileNumber(value);
            setSearchForCustomer(true);
        } else {
            setSearchForCustomer(false);
        }
    }

    async function searchCustomer(mobile) {
        const api = `${config.endpoint}/customer/${mobile}`;

        try {
            const response = await axios.get(api);
            console.log(response.data);
            enqueueSnackbar("Found Customer", { variant: "success" });
            setFilteredCustomers(response.data);
        } catch (error) {
            enqueueSnackbar("Couldn't find a customer from the database", { variant: "error" });
            setFilteredCustomers([]);
        }
    }

    useEffect(() => {
        if (!searchForCustomer) {
            const api = `${config.endpoint}/customer`;
            axios.get(api)
                .then((response) => {
                    console.log(response.data);
                    setFilteredCustomers(response.data);
                })
                .catch((error) => {
                    enqueueSnackbar("The Backend server is not working, please try again later", { variant: "error" });
                });
        } else {
            searchCustomer(mobileNumber);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchForCustomer, mobileNumber, edited]);

    return (
        <Fragment>
            <Box sx={{ ml: "10%", mr: "10%" }}>
                <header style={{ marginBottom: '10px' }}>
                    <Typography sx={{ display: "flex", justifyContent: "center", color: '#2c60bf' }} variant='h6' gutterBottom>
                        Customer App
                    </Typography>

                    <article>
                        <SearchBar classes="mobile" searchHandler={searchHandler} />
                        <BasicModal value="Add Customer" patch="false" edited={edited} setEdited={setEdited}  />
                    </article>
                </header>

                <main>
                    <Box>
                        <CustomerTable  customersDetails={filteredCustomers}  />
                    </Box>
                </main>
            </Box>
        </Fragment>
    );
}
