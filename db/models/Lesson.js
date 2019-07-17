const mongoose = require("../connection.js");

const Schema = mongoose.Schema;

const Lesson = new Schema({
  title: String,
  category: String,
  details: String
});

module.exports = mongoose.model("Lesson", Lesson);
