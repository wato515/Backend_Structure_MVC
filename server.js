require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const {notFound,errorHandler} = require("./middleware/errorMiddleware");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
connectDB();

app.use("/students", studentRoutes);
app.use("/api/users",userRoutes);
app.use("/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port`);
});