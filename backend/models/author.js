// D:\NTI\NTI Graduation Project\backend\models\author.js

const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  about: { type: String },
  image: { type: String }
});

const Author = mongoose.models.Author || mongoose.model("Author", authorSchema);

module.exports = Author;
