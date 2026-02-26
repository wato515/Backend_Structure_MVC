const express = require("express");
const {registerRoute, loginRoute} = require("../controllers/usercontroller");
const protect = require("../middleware/authMiddleware")
const {getProfile} = require("../controllers/usercontroller");
const router = express.Router();

router.post("/register", registerRoute);
router.post("/login", loginRoute);
router.get("/profile", protect, getProfile);
module.exports = router;