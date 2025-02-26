const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const deadlineSchema = new mongoose.Schema({
  deadlineType: { type: String },
  deadlineDate: {
    type: String
  },
});

const Deadline = mongoose.model("Deadline", deadlineSchema);

module.exports = Deadline;
