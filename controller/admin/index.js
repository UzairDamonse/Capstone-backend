const bcrypt = require("bcryptjs");
const con = require("../../lib/dbConnection");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Add Funtions

async function addPost(req, res) {
  const { post_title, post_content, post_image, user_id } = req.body;

  const date_of_post = new Date().toISOString().slice(0, 19).replace("T", " ");

  try {
    con.query(
      `INSERT INTO posts (post_title,post_content,post_image,user_id,date_of_post) VALUES ("${post_title}","${post_content}","${post_image}","${user_id}","${date_of_post}")`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
}

async function addGame(req, res) {
  const {
    game_id,
    game_name,
    game_description,
    game_engine,
    platform,
    release_date,
    rating,
    main_image,
    screenshot_1,
    screenshot_2,
    screenshot_3,
    screenshot_4,
  } = req.body;

  try {
    con.query(
      `INSERT INTO games (game_id,game_name,game_description,game_engine,platform,release_date,rating,main_image,screenshot_1,screenshot_2,screenshot_3,screenshot_4) VALUES ("${game_id}","${game_name}","${game_description}","${game_engine}","${platform}","${release_date}","${rating}","${main_image}","${screenshot_1}","${screenshot_2}","${screenshot_3}","${screenshot_4}")`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
}

// Edit Funtions

async function editPost(req, res) {
  const { post_title, post_content, post_image, user_id } = req.body;

  const date_of_post = new Date().toISOString().slice(0, 19).replace("T", " ");

  let id = req.params.id;

  try {
    con.query(
      `UPDATE posts SET post_title="${post_title}",post_content="${post_content}",post_image="${post_image}",user_id="${user_id}",date_of_post="${date_of_post}" WHERE posts.post_id = "${id}"`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
}

async function editGame(req, res) {
  const {
    game_id,
    game_name,
    game_description,
    game_engine,
    platform,
    release_date,
    rating,
    main_image,
    screenshot_1,
    screenshot_2,
    screenshot_3,
    screenshot_4,
  } = req.body;

  let id = req.params.id;

  try {
    con.query(
      `UPDATE games SET game_id="${game_id}",game_name="${game_name}",game_description="${game_description}",game_engine="${game_engine}",platform="${platform}",release_date="${release_date}",rating="${rating}",main_image="${main_image}",screenshot_1="${screenshot_1}",screenshot_2="${screenshot_2}",screenshot_3="${screenshot_3}",screenshot_4="${screenshot_4}" WHERE games.game_id = "${id}"`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
}

// Delete Funtions

async function deletePost(req, res) {
  let id = req.params.id;

  try {
    con.query(
      `DELETE FROM posts WHERE posts.post_id = "${id}"`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
}

async function deleteGame(req, res) {
  let id = req.params.id;

  try {
    con.query(
      `DELETE FROM games WHERE games.game_id = "${id}"`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  addPost,
  addGame,
  editPost,
  editGame,
  deletePost,
  deleteGame,
};
