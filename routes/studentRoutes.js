const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentcontroller");

router.post("/", studentController.createStudent);
router.get("/", studentController.getAllstudent);
router.get("/:id", studentController.getStudentById);
router.put("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);

module.exports = router;