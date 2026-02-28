const Order = require("../models/Order.js");
const asyncHandler = require("express-async-handler");

exports.addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req. body;

    console.log(orderItems);

    if (!orderItems || orderItems.length === 0) {
        res.status(400);
        throw new Error("No Order itmes");
    }else{
        const order = new Order({
            user:req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();
        res.status(201).json({
            message:"Successfully Ordered.",
            order: createdOrder});
    }
});