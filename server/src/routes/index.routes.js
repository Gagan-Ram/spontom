const router = require("express").Router()

const customerRoute = require("./customer.routes.js")

router.use("/customer", customerRoute )

module.exports = router