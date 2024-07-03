const express = require("express");
const route = express.Router();

const {checkoutCotrol} = require("../controllers/checkout.controller")

route.post("/", checkoutCotrol);

module.exports = route;