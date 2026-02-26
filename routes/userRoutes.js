const express = require("express");
const {registerRoute, loginRoute} = require("../controllers/usercontroller");
const protect = require("../middleware/authMiddleware")
const {getProfile,updateProfile} = require("../controllers/usercontroller");
const router = express.Router();

router.post("/register", registerRoute);
router.post("/login", loginRoute);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
module.exports = router;