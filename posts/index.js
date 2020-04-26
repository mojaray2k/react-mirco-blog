const express = require("express");
const { randomBytes } = require("crypto");

const app = express();

app.use(express.json());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  // get for random bytes of data to create an id property on any post created
  const id = randomBytes(4).toString("hex");

  // create title as a property on any post created
  const { title } = req.body;

  /**
   * Create a post record in memory, meaning when the application
   * is shut down the data is lost
   */
  posts[id] = {
    id,
    title,
  };

  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
