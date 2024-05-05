require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/dbconfig");
const cors = require("cors");
const Routes = require("./routes");
const middlewares = require("./middlewares/");
const { errorHandler } = middlewares.errorhandler;

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", Routes.driverRoutes);
app.use("/api", Routes.studentRoutes);

app.use(errorHandler);

app.listen(port, () => {
  connectDB();
  console.log(`Sever listening on ${port}`);
});
