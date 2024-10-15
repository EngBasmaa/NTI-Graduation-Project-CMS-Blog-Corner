const express = require("express");
const router = express.Router();
const Author = require("../models/author");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Set up multer storage for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/")); // Ensure the "uploads" directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname); // Create a unique filename using a timestamp
  }
});

const upload = multer({ storage });

// Endpoint for uploading images
router.post("/upload", upload.single("image"), (req, res) => {
  res.send("File uploaded successfully");
});

// Registration route
router.post("/register", upload.single("image"), (req, res) => {
  const author = new Author(req.body);

  // Save the uploaded image filename
  author.image = req.file ? req.file.filename : "";

  const salt = bcrypt.genSaltSync(10); // 10 characters
  author.password = bcrypt.hashSync(req.body.password, salt);

  author
    .save()
    .then(savedAuthor => res.status(200).json(savedAuthor))
    .catch(err => res.status(400).send(err));
});

// Login route
router.post("/login", async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log incoming request
    const { email, password } = req.body;

    if (!email || !password) {
      console.error("Email or password missing");
      return res.status(400).send("Email and password are required");
    }

    const author = await Author.findOne({ email });
    if (!author) {
      console.error("Email not found:", email);
      return res.status(400).send("Email not found");
    }

    const isValid = await bcrypt.compare(password, author.password);
    if (!isValid) {
      console.error("Invalid password for email:", email);
      return res.status(400).send("Email or password is invalid");
    }

    const payload = {
      _id: author.id,
      email: author.email,
      fullname: `${author.name} ${author.lastname}`
    };

    const secret = process.env.JWT_SECRET || "your_default_secret"; // Ensure this is set
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    console.log("Generated JWT:", token);
    res.status(200).json({ token });
  } catch (err) {
    console.error("Error during login:", err); // Log the error
    res.status(500).send("Internal server error");
  }
});

// Get image by filename (optional if already included in the main app.js)
router.get("/getImage/:filename", (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, "../uploads", filename); // Adjust path as necessary

  console.log("Requested file path:", filepath); // Log the filepath for debugging

  res.sendFile(filepath, err => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(404).send("File not found");
    }
  });
});

// Get all authors
router.get("/", (req, res) => {
  Author.find()
    .then(authors => res.status(200).send(authors))
    .catch(err => res.status(400).send(err));
});

// Get author by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Author.findById(id)
    .then(author => res.status(200).send(author))
    .catch(err => res.status(400).send(err));
});

// Delete author by ID
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const author = await Author.findByIdAndDelete(id);

    if (!author) {
      return res.status(404).send("Author not found");
    }
    res.status(200).json(author);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/getArticle/:id", (req, res) => {
  const id = req.params.id;
  Article.findById(id) // Use id directly
    .then(article => {
      if (!article) {
        return res.status(404).send("Article not found");
      }
      res.status(200).send(article);
    })
    .catch(err => res.status(400).send(err));
});

module.exports = router;
