// Importing required modules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
var cors = require("cors");
const authRouter = require("./router/authRouter");
const adminRouter = require("./router/adminRouter");
const studentRouter = require("./router/studentRouter");
const supervisorRouter = require("./router/supervisorRouter");


//Intialising the express app
const app = express();

app.use(cors()); // Enable Cross-Origin Resource S  haring
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(logger("dev"));

//Database connection
const DB = process.env.DATABASE;
mongoose.connect(DB)
    .then(() => console.log("DB connection successful!"))
    .catch((error) => {
        console.error("Error connecting to the database: ", error);
    });

app.get("/", (req, res) => res.send("<h1>Server is running</h1>"));
app.use("/api/v1/image/", express.static("public/"));

//Defining route
app.use("/api/v1", authRouter);
app.use("/api/v1", adminRouter);
app.use("/api/v1", studentRouter);
app.use("/api/v1", supervisorRouter);

app.all("*", (req, res) => {
    res.status(404).json({
        status: "error",
        message: "URL not found",
    });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}!`));
