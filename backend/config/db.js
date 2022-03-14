const mongoose = require("mongoose");

const connectString = process.env.DATABASE_CONNECTION;
const connectDB = async () => {
  try {
    await mongoose.connect(connectString);
    console.log("mongoDB connection SUCCESSFUL");
  } catch (error) {
    console.log("mongoDB connection FAILED");
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
