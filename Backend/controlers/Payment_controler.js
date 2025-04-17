const {razorpay} = require("../Payments/Razorpay")

 exports.createOrder = async (req, res) => {
  const {amount} = req.body;
  const options = {
    amount:amount*100 , // ₹500 in paise
    currency: "INR",
    receipt: "order_rcptid_11",
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// module.exports = { createOrder };
