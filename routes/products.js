const express = require("express");
const router = express.Router();
const passport = require("../middleware/passport");
const productsController = require("../controllers/productsController");
const { isAdmin } = require("../middleware/auth");

router.get("/", productsController.getProducts);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  productsController.addProduct
);

router.get("/:id", productsController.showProduct);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  productsController.updateProduct
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  productsController.deleteProduct
);

module.exports = router;
