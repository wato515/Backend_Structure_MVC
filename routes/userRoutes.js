const express = require("express");
const {registerRoute, loginRoute, getUsers, getuserById, deleteUser} = require("../controllers/usercontroller");
const {protect, admin} = require("../middleware/authMiddleware")
const {getProfile,updateProfile} = require("../controllers/usercontroller");
const router = express.Router();

router.post("/register", registerRoute);
router.post("/login", loginRoute);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

router.get("/",protect, admin, getUsers);
router.get("/:id", protect, admin, getuserById);
router.delete("/:id", protect, admin, deleteUser);
module.exports = router;