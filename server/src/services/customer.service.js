const { Customer } = require('../models/index.model.js')

const createCustomer = async (customerData) => {

    try {
        const insertCustomer = new Customer(customerData)
        
        const insertDocument = await insertCustomer.save(insertCustomer)
        
        return insertDocument


    } catch (error) {
        throw new Error("Couldn't  create customer in database");
    }

}

const getAllCustomersFromDatabase = async () => {

    try {

        const filter = { }

        const findCustomer = await Customer.find(filter)
        return findCustomer

    } catch (error) {
        throw new Error("can't get all Customer from database")
    }

}

const getCustomerByNumber = async (mobile) => {
    
    try {

        const filter = { mobile: mobile }

        const findCustomer = await Customer.find(filter)
        return findCustomer

    } catch (error) {
        throw new Error("can't find Customer in database")
    }

}

const deleteCustomerById = async ( custId ) => {
    const id = custId

    try{
        const filter = { _id: id }

        const deleteCustomer = await Customer.deleteOne(filter)
        return deleteCustomer
    }
    catch ( error ){
        throw new Error("couldn't able to delete customer")
    }
}

const updateCustomerDetails = async (custId, body) => {
    
    console.log(custId);
    const  { firstName, lastName, mobile, aadhar } = {...body}
    // console.log(firstName +" " + lastName+ " " + mobile+ " "+ aadhar);
    try {

        const updateUserAddress = await Customer.findByIdAndUpdate( custId , 
            {
                firstName : firstName,
                lastName : lastName,
                mobile : mobile,
                aadhar : aadhar 
            } 
            , {new: true} )
        return updateUserAddress

    } catch (error) {
        throw new Error("can't update user address in database")
    }

}

module.exports = {
    customerService: {
        createCustomer,
        getAllCustomersFromDatabase,
        getCustomerByNumber,
        updateCustomerDetails,
        deleteCustomerById

    }
}