const express = require("express");
// const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const createError = require("http-errors");
require("dotenv").config();

const categoryRoutes = require("./routes/category");
const dishRoutes = require("./routes/dish");
const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/order");
const paymentRoutes = require("./routes/payment");

const app = express(); //to create a server

//middleware
// app.use(morgan("dev")); //to Server log
app.use(cors()); //to accept requests from any origin
app.use(express.json({ limit: "3mb" })); //to receive json data
app.use(express.urlencoded({ limit: "3mb", extended: true }));

const PORT = process.env.PORT;
const DATABASE = process.env.DATABASE;
const PREFIX = "/" + process.env.PREFIX;

app.use(PREFIX, categoryRoutes);
app.use(PREFIX, dishRoutes);
app.use(PREFIX, userRoutes);
app.use(PREFIX, orderRoutes);
app.use(PREFIX, paymentRoutes);

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

//connect to database
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await mongoose.connect(DATABASE);
    console.log("Connected to Mongo...");
  } catch (error) {
    console.log("🚀 ~ file: index.js ~ line 26 ~ app.listen ~ error", error);
  }
}); //to start the server

//TODO: handling invalid route
app.use(async (req, res, next) => {
  next(createError.NotFound());
}); //we pass this error to the next middleware

//here we pass the error we created in the previous middleware
app.use((err, req, res, next) => {
  // res.status = err.status || 500;
  console.log(err.status);

  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message || "Internal Server Error",
    },
  });
});
