let comments = [
  {
    username: "Fossil Renato",
    date: "July 4, 2023 at 9:09:51 PM",
    bookId: "9781591847441",
    body: " Elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Nisl nunc mi ipsum faucibus. Semper auctor neque vitae tempus quam pellentesque nec nam. Tortor condimentum lacinia quis vel eros donec. Nulla pharetra diam sit amet nisl suscipit adipiscing. Platea dictumst vestibulum rhoncus est. Vestibulum mattis ullamcorper velit sed. Eget nunc scelerisque viverra mauris in aliquam sem. Pretium vulputate sapien nec sagittis aliquam malesuada.",
    id: 3,
  },
  {
    username: "Ahmed",
    date: "July 5, 2023 at 9:51:45 AM",
    bookId: "9781136325298",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non pulvinar neque laoreet suspendisse interdum. Pretium viverra suspendisse potenti nullam ac. Tellus mauris a diam maecenas sed enim ut. Tortor consequat id porta nibh. sakebnaskdjgbalskjdbasldfkbgasldkgbaskldjgb",
    id: 4,
  },
];

const express = require("express");
const app = express();
const port = 3000;

app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.originalUrl}`);
  next();
});
// add this line
app.use(express.json()); // this allows us to send JSON formatted bodies in our requests

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get("/comments", (req, res) => {
  res.send(comments);
});
app.get("/comments/:id", (req, res) => {
  const commentId = parseInt(req.params.id);
  const comment = comments.find((comment) => comment.id === commentId);

  if (!comment) {
    return res.status(404).send("Comment not found");
  }

  res.send(comment);
});

app.delete("/comments/:id", function (req, res) {
  const commentId = parseInt(req.params.id, 10);
  console.log(commentId);
  const commentIndex = comments.findIndex(
    (comment) => comment.id === commentId
  );
  if (commentIndex === -1) {
    return res.status(404).send(`No record found with id ${commentId}`);
  }
  comments.splice(commentIndex, 1);
  res.send(`Deleted record with id ${commentId}`);
});

app.post("/comments", function (req, res) {
  const newPost = req.body;
  if (
    !newPost ||
    !newPost.username ||
    !newPost.date ||
    !newPost.bookId ||
    !newPost.body ||
    !newPost.id
  ) {
    return res.status(400).send("Incomplete data");
  }
  console.log("newPost", newPost);
  comments.push(newPost);
  res.send(newPost);
});

app.patch("/comments/:id", function (req, res) {
  const commentId = parseInt(req.params.id, 10);
  const commentIndex = comments.findIndex(
    (comment) => comment.id === commentId
  );

  if (commentIndex === -1) {
    return res.status(404).send(`No record found with id ${commentId}`);
  }

  const updates = req.body;

  comments[commentIndex] = { ...comments[commentIndex], ...updates };

  res.send(comments[commentIndex]);
});
