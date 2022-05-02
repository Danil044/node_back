const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// установка схемы
const student = new Schema({
    name: String,
    age: Number
});

module.exports = mongoose.model("Students", student)