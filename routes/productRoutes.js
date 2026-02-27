const express = require("express");
const {getProductById, updateProduct, deleteProduct, getProducts, createProduct} = require("../controllers/productcontroller");
const {protect, admin} = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/:id")
      .get(protect, admin, getProductById)
      .put(protect, admin, updateProduct)
      .delete(protect, admin, deleteProduct);

router.route("/")
      .get(getProducts)
      .post(protect, admin, createProduct);

module.exports = router;