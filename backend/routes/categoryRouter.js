const router = require("express").Router();
const categoryController = require("../controllers/categoryController");

router.route("/category").get(categoryController.getCategories);

module.exports = router;
