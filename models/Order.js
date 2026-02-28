const mongoose = require("mongoose");

const orderItemSchema = mongoose.Schema({
    name:{type:String, required:true,},
    qty:{type:String, required:true},
    image:{type:String, required:true},
    price:{type:Number, required:true},
    product:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Product"
    },
},
    {
        timestamps:true
    }
);

const orderSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    orderItems: [orderItemSchema],
    shippingAddress:{
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        },
    paymentMethod: { type: String, required: true },
    paymentResult: {
        id:{type:String},
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
    },
    itemsPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
},
    {
        timestamps:true
    }
);

module.exports = mongoose.model("Order", orderSchema);