const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const passport = require("passport");

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  cartController.getCartItems
);
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  cartController.addCartItem
);
router.delete(
  "/:userId/:productId",
  passport.authenticate("jwt", { session: false }),
  cartController.deleteItem
);

module.exports = router;
