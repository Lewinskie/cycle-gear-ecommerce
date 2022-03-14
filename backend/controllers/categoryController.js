const Category = require("../models/categoryModel");

const getCategories = async (req, res) => {
  try {
    // res.json("categories");
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.getCategories = getCategories;
