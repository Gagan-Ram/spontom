const Joi = require("joi")

const addCustomerBodyValidationSchema = Joi.object().keys({
    firstName : Joi.string().max(30).required(),
    lastName : Joi.string().max(30).required(),
    mobile : Joi.number().min(1000000000).max(9999999999).required(),
    aadhar : Joi.number().min(100000000000).max(999999999999).required()
})

module.exports = {
    addCustomerBodyValidationSchema
}