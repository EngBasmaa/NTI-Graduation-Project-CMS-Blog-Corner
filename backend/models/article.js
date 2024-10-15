const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: String,
  idAuthor: String,
  description: String,
  date: String,
  content: String,
  image: String,
  tags: Array
});

const Article =
  mongoose.models.Article || mongoose.model("Article", articleSchema);

module.exports = Article;
