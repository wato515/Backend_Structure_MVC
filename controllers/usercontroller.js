const asyncHandler = require("../middleware/asyncHandler");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.registerRoute = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    const userExist = await User.findOne({email});
    if (userExist) {
        res.status(400);
        throw new Error("User already exists.")
    }
    const user = await User.create({name, email, password});
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email
    });
})

exports.loginRoute = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email
        })
    }else {
        res.status(401);
        throw new Error("Invalid email or password.");
    }
})