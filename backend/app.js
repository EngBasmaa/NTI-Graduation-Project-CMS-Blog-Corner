const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

app.use(cors());
app.use(bodyParser.json());

require("./config/connect");
const articleRoute = require("./routes/article.route");
const authorRoute = require("./routes/author.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // using form url encoded

// Routes
app.use("/article", articleRoute);
app.use("/author", authorRoute);

// Endpoint to get images from the uploads directory for frontend
app.use("/getImage/:filename", (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, "uploads", filename); // Ensure uploads folder exists

  console.log("Requested file path:", filepath); // Log the filepath for debugging

  res.sendFile(filepath, err => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(404).send("File not found");
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
