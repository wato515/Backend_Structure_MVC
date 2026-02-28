const express =require("express");
const {protect} = require("../middleware/authMiddleware");
const { addOrderItems, getMyrorders, getOrderById } = require("../controllers/ordercontroller");

const router = express.Router();

router.route("/")
      .post(protect, addOrderItems);

router.route("/myorder")
      .get(protect, getMyrorders);
router.route("/:id")
      .get(protect, getOrderById);

module.exports = router;