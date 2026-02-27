const express = require("express");
const {getProductById, updateProduct, deleteProduct, getProducts, createProduct, getProductswithPagination, createProductReview, getTopRating} = require("../controllers/productcontroller");
const {protect, admin} = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/top")
      .get(protect, getTopRating);

router.route("/:id")
      .get(protect, admin, getProductById)
      .put(protect, admin, updateProduct)
      .delete(protect, admin, deleteProduct);

router.route("/:id/reviews")
      .post(protect, createProductReview);

router.route("/")
      .get(getProductswithPagination)
      .get(getProducts)
      .post(protect, admin, createProduct);

module.exports = router;