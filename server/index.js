require("dotenv").config()
const express = require("express");
const app = express();
const cors = require("cors");
const checkoutRoute = require("./routes/checkout.router")
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8081;
const DBURL = process.env.DB_URL;

app.use(express.json());
app.use(cors());

app.use("/checkout", checkoutRoute);


const DBServer = async () => {
    try {
        await mongoose.connect(DBURL);
        console.log("MongoDB server is connected");
        app.listen(PORT, ()=>{
            console.log(`The Server is Runing at http://localhost:${PORT}`)
        });
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

DBServer();



