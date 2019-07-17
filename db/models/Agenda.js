const mongoose = require("../connection.js");

const Schema = mongoose.Schema;

const Agenda = new Schema({
  date: String,
  announcements: String,
  tasks: String,
  shoutOuts: String,
  lesson: {
    type: Schema.Types.ObjectId,
    ref: "Lesson"
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Agenda", Agenda);
