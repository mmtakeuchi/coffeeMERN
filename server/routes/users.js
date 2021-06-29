const express = require("express");
const router = express.Router();
const passport = require("passport");
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
router.post("/register", userController.register);

// LOGIN
router.post("/login", userController.login);

module.exports = router;
