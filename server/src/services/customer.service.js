const { Customer } = require("../models/index.model.js");

const createCustomer = async (customerData) => {
    try {
        if (await Customer.isMobileTaken(customerData.mobile)) {
            throw new Error("Mobile already Present");
        }
        if (await Customer.isAadharTaken(customerData.aadhar)) {
            throw new Error("Aadhar already Present");
        }
        const insertCustomer = new Customer(customerData);

        const insertDocument = await insertCustomer.save(insertCustomer);

        return insertDocument;
    } catch (error) {
        throw new Error(
            error.message && error.message != ""
                ? error.message
                : "Couldn't Add to Db"
        );
    }
};

const getAllCustomersFromDatabase = async () => {
    try {
        const filter = {};

        const findCustomer = await Customer.find(filter);
        return findCustomer;
    } catch (error) {
        throw new Error("can't get all Customer from database");
    }
};

const getCustomerByNumber = async (mobile) => {
    try {
        const filter = { mobile: mobile };

        const findCustomer = await Customer.find(filter);
        return findCustomer;
    } catch (error) {
        throw new Error("can't find Customer in database");
    }
};

const deleteCustomerById = async (custId) => {
    const id = custId;

    try {
        const filter = { _id: id };

        const deleteCustomer = await Customer.deleteOne(filter);
        return deleteCustomer;
    } catch (error) {
        throw new Error("couldn't able to delete customer");
    }
};

const updateCustomerDetails = async (custId, body) => {
    console.log(custId);
    const { firstName, lastName, mobile, aadhar } = { ...body };
    // console.log(firstName +" " + lastName+ " " + mobile+ " "+ aadhar);
    try {
        if (await Customer.isMobileTaken(mobile, custId)) {
            throw new Error("Mobile already Present");
        }
        else if (await Customer.isAadharTaken(aadhar, custId)) {
            throw new Error("Aadhar already Present");
        }
        const updateUserAddress = await Customer.findByIdAndUpdate(
            custId,
            {
                firstName: firstName,
                lastName: lastName,
                mobile: mobile,
                aadhar: aadhar,
            },
            { new: true }
        );
        return updateUserAddress;
    } catch (error) {
        throw new Error(
            error.message && error.message != ""
                ? error.message
                : "can't update customer data into the database"
        );
    }
};

module.exports = {
    customerService: {
        createCustomer,
        getAllCustomersFromDatabase,
        getCustomerByNumber,
        updateCustomerDetails,
        deleteCustomerById,
    },
};