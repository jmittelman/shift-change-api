const mongoose = require("../connection.js");

const Schema = mongoose.Schema;

const User = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  myAgendas: [
    {
      type: Schema.Types.ObjectId,
      ref: "Agenda"
    }
  ]
});

module.exports = mongoose.model("User", User);
