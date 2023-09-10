const { customerService } = require("../services/index.service.js");

const addCustomer = async (req, res) => {
  const customerData = req.body;

  try {
    const result = await customerService.createCustomer(customerData);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const result = await customerService.getAllCustomersFromDatabase();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "couldn't able to find customer ",
      error,
    });
  }
};

const searchByNumber = async (req, res) => {
  const mobile = req.params.mobile;

  try {
    const result = await customerService.getCustomerByNumber(mobile);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "couldn't able to find customer by ID ",
      error,
    });
  }
};

const deleteById = async (req, res) => {
  const id = req.params.custId;
  try {
    const result = await customerService.deleteCustomerById(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "couldn't able to delete customer by ID ",
      error,
    });
  }
};

const patchCustomer = async (req, res) => {
  const custId = req.params.custId;
  const body = req.body;

  try {
    const result = await customerService.updateCustomerDetails(custId, body);
    res.json(result);
  } catch (error) {
    res.status(500).json({
        message: error.message,
      error,
    });
  }
};

module.exports = {
  customerController: {
    addCustomer,
    getAllCustomers,
    searchByNumber,
    deleteById,
    patchCustomer,
  },
};