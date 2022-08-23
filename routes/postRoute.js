const express = require("express");
const router = express.Router();
const con = require("../lib/dbConnection");
const middleware = require("../middleware/middleware");
const admin = require("../controller/admin/index");

// All posts

router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM posts", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

// Single posts

router.get("/:id", (req, res) => {
  id = req.params.id;
  try {
    con.query(
      `SELECT * FROM posts WHERE posts.post_id = ${id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// Add product

router.post("/", (req, res) => {
  return admin.addPost(req, res);
  //   console.log(req.user);
});

// Edit product

router.put("/:id", (req, res) => {
  return admin.editPost(req, res);
});

// Delete posts

router.delete("/:id", (req, res) => {
  return admin.deletePost(req, res);
});

module.exports = router;
