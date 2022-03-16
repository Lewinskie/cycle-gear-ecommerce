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

const createCategory = async (req, res) => {
  try {
    //   IF USER HAS ROLE=1---> ADMIN
    //ONLY ADMINS CAN CREATE,DELETE AND UPDATE CATEGORIES
    const { name } = req.body;

    //FIRST CHECK IF THE CATEGORY EXISTS
    const category = await Category.findOne({ name });
    if (category)
      return res.status(400).json({ msg: "This category already exists!" });

    //IF CATEGORY DOESNT EXIST,CREATE A NEW ONE
    const newCategory = await new Category({ name });

    //SAVE THE NEW CATEGORY
    await newCategory.save();

    res.json({ msg: "Created a category" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
//DELETE CATEGORY
const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    //FIRST CHECK IF THE CATEGORY EXISTS
    const category = await Category.findById(id);

    if (!category)
      return res.status(400).json({ msg: "Category does not exist!" });
    await Category.findByIdAndDelete(id);

    res.json({ msg: "Deleted a category" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// UPDATE A CATEGORY
const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const id = req.params.id;
    //FIRST CHECK IF IT EXISTS

    const category = await Category.findById(id);

    if (!category) return res.status(400).json("Category does not exist!");

    await Category.findOneAndUpdate(id, { name });

    res.json({ msg: "Updated a category" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.getCategories = getCategories;
exports.createCategory = createCategory;
exports.deleteCategory = deleteCategory;
exports.updateCategory = updateCategory;
