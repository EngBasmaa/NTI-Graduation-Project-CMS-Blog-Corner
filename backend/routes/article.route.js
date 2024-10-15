const express = require("express");
const router = express.Router();
const Article = require("../models/article");
const multer = require("multer");
const path = require("path");

// upload images:
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/")); // Ensure the "uploads" directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname); // Create a unique filename using a timestamp
  }
});

const upload = multer({ storage });

router.post("/upload", upload.single("image"), (req, res) => {
  res.send("File uploaded successfully");
});
// ...........
router.get("/getImage/:filename", (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, "uploads", filename); // Adjust path as necessary

  console.log("Requested file path:", filepath); // Log the filepath for debugging

  res.sendFile(filepath, err => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(404).send("File not found");
    }
  });
});

router.post("/create-article", upload.any("image"), (req, res) => {
  const article = new Article(req.body);
  let images;
  if (req.files && req.files.length > 0) {
    images = req.files.map(file => file.filename);
  } else {
    images = [];
  }
  article.image = images.length > 0 ? images[0] : "";
  article.tags = Array.isArray(req.body.tags) ? req.body.tags : [];
  article.date = new Date();

  article
    .save()
    .then(() => {
      res.status(200).send(article);
    })
    .catch(err => res.status(500).send(err));
});

router.get("/all", (req, res) => {
  Article.find()
    .then(articles => res.status(200).send(articles))
    .catch(err => res.status(400).send(err));
});

// router.get("/getArticle/:id", (req, res) => {
//   const id = req.params.id;
//   Article.findById((_id = id))
//     .then(article => res.status(200).send(article))
//     .catch(err => res.status(400).send(err));
// });

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

router.get("/getAuthor/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const articles = await Article.find({ idAuthor: id });

    if (!articles) {
      return res.status(200).json([]);
    }
    res.status(200).json(articles);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/article/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const article = await Article.findByIdAndDelete(id);

    if (!article) {
      return res.status(404).send("Article not found");
    }
    res.status(200).json(article);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.put("/articles/:id", upload.any("image"), async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    if (updatedData.tags) {
      if (typeof updatedData.tags === "string") {
        updatedData.tags = updatedData.tags.split(",").map(tag => tag.trim());
      } else if (Array.isArray(updatedData.tags)) {
        updatedData.tags = updatedData.tags.map(tag => tag.trim());
      } else {
        return res.status(400).send("Invalid tags format.");
      }

      // Join them into a string formatted as an array
      updatedData.tags = `[${updatedData.tags.join(", ")}]`;
    } else {
      updatedData.tags = "[]";
    }

    if (req.files && req.files.length > 0) {
      const images = req.files.map(file => file.filename);
      updatedData.image = images.length > 0 ? images[0] : "";
    }

    const updatedArticle = await Article.findByIdAndUpdate(id, updatedData, {
      new: true
    });

    if (!updatedArticle) {
      return res.status(404).send("Article not found");
    }

    res.status(200).json(updatedArticle);
  } catch (err) {
    console.error("Error updating article:", err);
  }
});

module.exports = router;
