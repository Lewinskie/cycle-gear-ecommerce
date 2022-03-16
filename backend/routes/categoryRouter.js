const router = require("express").Router();
const categoryController = require("../controllers/categoryController");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
  .route("/category")
  .get(categoryController.getCategories)
  .post(auth, authAdmin, categoryController.createCategory);

router
  .route("/category/:id")
  .delete(categoryController.deleteCategory)
  .put(categoryController.updateCategory);

module.exports = router;
