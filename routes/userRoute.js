const express = require("express");
const router = express.Router();
const con = require("../lib/dbConnection");
const middleware = require("../middleware/middleware");
const auth = require("../controller/auth/index");

// All users

router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM users", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

// Single user

router.get("/:id", (req, res) => {
  id = req.params.id;
  try {
    con.query(
      `SELECT * FROM users WHERE users.user_id = ${id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// Edit user

router.put("/", middleware, (req, res) => {
  // Sql Check if the email is in the database

  let sql = "SELECT * FROM users WHERE ?";
  const id = {
    user_id: req.user.user_id,
  };

  // Connect and get results
  con.query(sql, id, (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      res.send("User not found");
    } else {
      let updateSql = `UPDATE users SET ? WHERE user_id = ${req.user.user_id}`;
      const { user_name, email, password, type, phone_number, imgURL, bio } =
        req.body;
      console.log(email);

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      let user = {
        user_name,
        email,
        password: hash,
        type,
        phone_number,
        imgURL,
        bio,
      };
      con.query(updateSql, user, (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    }
  });
});

// Delete user

router.delete("/:id", middleware, (req, res) => {
  if (req.user.user_type === "admin") {
    let id = req.params.id;

    try {
      con.query(
        `DELETE FROM users WHERE users.user_id = "${id}"`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("Not valid user");
  }
});

// Encryption

const bcrypt = require("bcryptjs");

// Register user

router.post("/register", (req, res) => {
  return auth.Register(req, res);
});

// Login user

router.post("/login", (req, res) => {
  return auth.Login(req, res);
});

// Verify

router.get("/users/verify", (req, res) => {
  return auth.Verify(req, res);
});
module.exports = router;
