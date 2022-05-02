const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// установка схемы
const portfolio = new Schema({
    name: String,
    imgBlob: String,
    imgUrl: String
});

module.exports = mongoose.model("Portfolio", portfolio)