let mongoose = require("mongoose");

let recordSchema = new mongoose.Schema({
  url: { type: String, default: null },
  shortened_url: { type: String, default: null },
  ip: { type: String, default: null },
  created_at: {
    type: Date,
    default: Date.now,
  },
  expire_at: {
    type: Date,
    default: Date.now,
    index: { expires: "2d" },
  },
});

module.exports = mongoose.model("record", recordSchema);
