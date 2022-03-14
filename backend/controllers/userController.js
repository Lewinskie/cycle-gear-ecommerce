const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    //DESTRUCTURE REQ.BODY
    const { name, email, password } = req.body;

    // CHECK IF USER EXISTS USING THE EMAIL SUBMITTED
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "The email already exists!" });

    //CHECK THE LENGTH OF THE PASSORD
    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "Password should be atleast 6 characters long" });

    //PASSWORD ENCRYPTION
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await new User({ name, email, password: passwordHash });

    //SAVE CREATED USER TO MONGODB
    await newUser.save();

    //CREATE A JSON WEB TOKEN FOR AUTHENTICATION
    const accesstoken = createAccessToken({ id: newUser._id });

    res.cookie("accesstoken", accesstoken, {
      httpOnly: true,
      path: "/user/access_token",
    });

    // res.json(accesstoken);

    res.json({ msg: "User registered successfully!" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//LOGIN FUNCTION
const login = async (req, res) => {
  try {
    //   REQ.BODY DESTRUCTURING
    const { email, password } = req.body;

    //CHECK IF THE USERS EMAIL EXISTS
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    //COMPARE PASSWORD SAVED IN DB AND TEH ONE USER SUBMITS
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });

    //

    //IF LOGIN SUCCESS, CREATE ACCESS TOKEN AND REFRESH TOKEN
    const accesstoken = createAccessToken({ id: user._id });

    //SET COOKIES
    res.cookie("accesstoken", accesstoken, {
      httpOnly: true,
      path: "/user/access_token",
    });
    res.status(200).json({ msg: "login success" });
    // res.json({ acesstoken });
    console.log({
      user: user,
      accesstoken: accesstoken,
      // refreshtoken: refreshtoken,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// LOGOUT FUNCTION
const logout = async (req, res) => {
  try {
    res.clearCookie("accesstoken", {
      path: "/user/access_token",
    });
    return res.json({ msg: "User logged out!" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//REFRESH TOKEN FUNCTION
const accessToken = (req, res) => {
  try {
    const access_token = req.cookies.accesstoken;

    //CHECK IF TOKEN IS EXPIRED OR NOT
    if (!access_token)
      return res.status(400).json({ msg: "Please log in or register" });

    jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err)
        return res.status(400).json({ msg: "Please log in or register" });

      const accesstoken = createAccessToken({ id: user.id });

      res.json({ user, accesstoken });
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// GET USER FUNCTION
const getUser = async (req, res) => {
  try {
    // USE SELECT ('-PASSWORD') SO AS NOT TO DISPLAY THE PASSWORD
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    res.json(user);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

exports.register = register;
exports.login = login;
exports.logout = logout;
exports.accessToken = accessToken;
exports.getUser = getUser;
