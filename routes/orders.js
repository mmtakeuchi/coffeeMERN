const express = require("express");
const router = express.Router();
const passport = require("../middleware/passport");
const orderController = require("../controllers/orderController");

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  orderController.getOrder
);

router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  orderController.checkout
);

module.exports = router;
