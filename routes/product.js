const express = require("express");
const router = express.Router();
const passport = require("passport");
const productsController = require("../controllers/productsController");
const { isAdmin } = require("../middleware/auth");

router.get("/test", (req, res) =>
  res.json({ msg: "This is the products route" })
);

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
