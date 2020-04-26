const express = require("express");
const { randomBytes } = require("crypto");

const app = express();

app.use(express.json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  // get for random bytes of data to create an commentId property on any comment created
  const commentId = randomBytes(4).toString("hex");

  // create a content property on any comment created
  const { content } = req.body;

  // Will return an array of comment id's or if it is undefined return an empty array
  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content });

  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
