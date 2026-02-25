const Student = require("../models/Student");
const asyncHandler = require("../middleware/asyncHandler");

exports.createStudent = asyncHandler(async (req, res) => {
        const student = await Student.create(req.body);
        res.status(201).json(student);
});

exports.getAllstudent = asyncHandler(async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

exports.getStudentById = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id);
    res.json(student);
});

exports.updateStudent = asyncHandler(async (req, res) => {
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
});

// DELETE
exports.deleteStudent = asyncHandler(async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted Successfully......" });
});