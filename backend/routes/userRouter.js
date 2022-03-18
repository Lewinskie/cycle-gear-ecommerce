const router = require("express").Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

// ROUTES -user/
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/access_token", userController.accessToken);
router.get("/infor", auth, userController.getUser);

module.exports = router;
