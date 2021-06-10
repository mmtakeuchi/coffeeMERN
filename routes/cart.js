const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/cart/:id", cartController.getCartItems);
router.post("/cart/:id", cartController.addCartItem);
router.delete("/cart/:userId/:productId", cartController.deleteItem);

module.exports = router;
