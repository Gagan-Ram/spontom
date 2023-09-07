const router = require("express").Router()

const {customerController} = require("../controllers/index.controllers.js")

const { addCustomerBodyValidationSchema } = require("../validations/customer.validator")
const { validateAddCustomerBody } = require("../middlewares/customer.middleware")
const  validateCustomerBody = validateAddCustomerBody(addCustomerBodyValidationSchema)

router.post("/",validateCustomerBody, customerController.addCustomer ) 

router.get("/", customerController.getAllCustomers )

router.get("/:mobile", customerController.searchByNumber )

router.delete("/:custId", customerController.deleteById )

router.patch("/:custId", validateCustomerBody, customerController.patchCustomer )

module.exports = router