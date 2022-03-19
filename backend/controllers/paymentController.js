const Payments = require("../models/paymentModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");

//GET PAYMENTS FUNCTION
const getPayments = async (req, res) => {
  try {
    const payments = await Payments.find();
    res.json(payments);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// CREATE PAYMENTS FUNCTION
const createPayment = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email");

    if (!user) return res.status(400).json({ msg: "User does not exist" });

    const { cart, paymentID, address } = req.body;
    const { _id, name, email } = user;

    const newPayment = new Payments({
      user_id: _id,
      name,
      email,
      cart,
      paymentID,
      address,
    });

    res.json({ newPayment });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.getPayments = getPayments;
exports.createPayment = createPayment;
