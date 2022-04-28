const express = require('express');
const router = express.Router();
const passport = require('passport');
const productController = require('../controllers/productController');
const { isAdmin } = require('../middleware/authAdmin');

router.get('/', productController.getProducts);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  productController.addProduct
);

router.get('/:id', productController.showProduct);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  productController.updateProduct
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  productController.deleteProduct
);

module.exports = router;
