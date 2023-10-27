const mongoose = require("mongoose");
const express = require("express")
require("dotenv").config()

const connection = mongoose.connect(process.env.mongoURL)

module.exports = {
    connection,
    express
}