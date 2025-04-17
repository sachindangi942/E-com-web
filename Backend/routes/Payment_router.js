const {createOrder} = require("../controlers/Payment_controler")
const router = require("express").Router()

// Create Order route
router.post("/create-order", createOrder);

module.exports = router;
