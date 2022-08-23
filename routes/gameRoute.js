const express = require("express");
const router = express.Router();
const con = require("../lib/dbConnection");
const middleware = require("../middleware/middleware");
const admin = require("../controller/admin/index");

// All games

router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM games", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

// Single games

router.get("/:id", (req, res) => {
  id = req.params.id;
  try {
    con.query(
      `SELECT * FROM games WHERE games.game_id = ${id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// Add game

router.post("/", (req, res) => {
  return admin.addGame(req, res);
  //   console.log(req.user);
});

// Edit game

router.put("/:id", (req, res) => {
  return admin.editGame(req, res);
});

// Delete games

router.delete("/:id", (req, res) => {
  return admin.deleteGame(req, res);
});

module.exports = router;
