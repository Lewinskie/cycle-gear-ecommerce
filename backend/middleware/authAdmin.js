const User = require("../models/userModel");

const authAdmin = async (req, res, next) => {
  try {
    //   GET USER INFORMATION BY ID
    const user = await User.findOne({ _id: req.user.id });

    //CHECK IF USER ROLE IS OF AN ADMIN
    if (user.role === 0)
      return res.status(400).json({ msg: "Admin resources access denied!" });
     

    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = authAdmin;
