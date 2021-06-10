const express = require("express");
const router = express.Router();
const passport = require("../middleware/passport");
const userController = require("../controllers/userController");
const { isAdmin } = require("../middleware/authAdmin");

// GET USER
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  userController.getUser
);

// REGISTER
router.post("/register", usersController.register);

// LOGIN
router.post("/login", usersController.login);

module.exports = router;
