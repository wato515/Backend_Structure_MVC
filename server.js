const express = require("express");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const app = express();

app.use(express.json());
connectDB();

app.use("/students", studentRoutes);
app.use(errorHandler);

app.listen(5000, () => {
    console.log("Server is running on 5000 port")
})