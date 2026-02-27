const asyncHandler = require("express-async-handler");
const Product = require("../models/Products");

exports.getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

exports.getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.status(201).json(product);
    }else{
        res.status(404);
        throw new Error("Product not found");
    }
});

exports.createProduct = asyncHandler(async (req ,res) => {
    const newproduct = new Product({
        user:req.user._id,
        name:"Lexus",
        image:"/images/sample.jpg",
        brand:"Sample brand",
        category:"Sample category",
        description:"Sample description",
        price:0,
        conuntInStock:0,
        numReviews:0      
    });

    const createdproduct = await newproduct.save();
    res.status(201).json(createdproduct);
});

exports.updateProduct = asyncHandler( async (req, res) => {
    const {name, image, brand, category, description, price, conuntInStock} = req.body;
    
    const product = await Product.findById(req. params.id);

    if(product){
        product.name = name;
        product.image = image,
        product.brand = brand,
        product.category = category,
        product.description = description,
        product.price = price,
        product.conuntInStock = conuntInStock
        
        const updateproduct = await product.save();
        res.status(201).json(updateproduct);

    }else {
        res.status(404);
        throw new Error("Product not found.")
    }
});

exports.deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.deleteOne();
        res.json({message:"Deleted Successfully"});
    }else{
        res.status(404);
        throw new Error("Product not found.");
    }
});

exports.getProductswithPagination = asyncHandler( async (req, res) => {
    const page = parseInt(req.query.pageNumber) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1)*limit;
    const search = req.query.search || "";

    const query = {
        name:{
            $regex:search, $options:"i"
        }
    };

    const products = await Product.find(query)
                                  .skip(skip)
                                  .limit(limit);
    const total = await Product.countDocuments(query);

    res.json({
        products,
        currentPage:page,
        totalPage:Math.ceil(total/limit)
    })
})