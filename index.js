const express = require("express");
// const morgan = require("morgan");
const cors = require("cors");
const createError = require("http-errors");
require("dotenv").config();
const { startWebSocketListener } = require("./helpers/web-sockets");

const categoryRoutes = require("./routes/category");
const dishRoutes = require("./routes/dish");
const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/order");
const paymentRoutes = require("./routes/payment");

const app = express();

console.log(process.env.CORS_ORIGIN);

const corsOptions = { origin: process.env.CORS_ORIGIN };
app.use(cors(corsOptions));

// app.use(morgan("dev"));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

const PORT = process.env.PORT;
const DATABASE = process.env.DATABASE;
const PREFIX = "/" + process.env.PREFIX;

app.use(PREFIX, categoryRoutes);
app.use(PREFIX, dishRoutes);
app.use(PREFIX, userRoutes);
app.use(PREFIX, orderRoutes);
app.use(PREFIX, paymentRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

// app.listen(PORT, async () => {

//   console.log("🚀 ~ file: index.js ~ line 14 ~ app.listen ~ port", PORT);

//   try {

//     await mongoose.connect(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
//     console.log('.');
//     console.log("🚀 ~ file: index.js ~ line 29 ~ app.listen ~ ...Connceted to MONGO..")

//   } catch (error) {

//     console.log("🚀 ~ file: index.js ~ line 31 ~ app.listen ~ error", error)

//   }

// });
startWebSocketListener(app);

app.use(async (req, res, next) => {
  next(createError.NotFound());
});

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
