const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    name:{type:String, required:true},
    rating:{type:Number, required:true},
    comment:{type:String, required:true},
    user:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User",
    },
},
    {
        timestamps:true
    }
);

const productSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User"
    },
    name:{type:String, required:true},
    iamge:{type:String, required:true, default: "/images/sample.jpg"},
    brand:{type:String, required:true},
    category:{type:String, required:true},
    description:{type:String, required:true},
    reviews:[reviewSchema],
    rating:{type:Number, required:true, default:0},
    numReviews:{type:Number, required:true, default:0},
    price:{type:Number, required:true, default:0},
    conuntInStock:{type:Number, required:true, default:0},
},
    {
        timestamps:true
    }
);

module.exports = mongoose.model("Product", productSchema);
