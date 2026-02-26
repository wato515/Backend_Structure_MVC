const asyncHandler = require("../middleware/asyncHandler");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

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

//    const isMatch = await bcrypt.compare(password, user.password);
      const isMatch = await user.matchPassword(password);
    if (user && isMatch) {
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }else {
        res.status(401);
        throw new Error("Invalid email or password.");
    }
})

exports.getProfile = asyncHandler(async (req, res) =>{
    res.json(req.user);
});

exports.updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }
        const updateProfile = await user.save();
        res.json({
            _id:updateProfile._id,
            name:updateProfile.name,
            email:updateProfile.email,
            token:generateToken(req.user._id)
        })
        console.log(updateProfile._id);
        console.log(req.user._id);
    }
    else {
        res.status(404);
        throw new Error("User not found");
    }
});

exports.getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select("-password");
    res.json(users);
})