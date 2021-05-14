require("dotenv").config();

const express = require("express");
const app = express();

const userRouter = require('./api/users/router').router;
const toDoRouter = require('./api/todos/router').router;

app.use(express.json());
app.get("/", function (req, res) {
  res.send("nodejs is fantastic ...");
});
app.get("/api", function (req, res) {
  res.send("nodejs is fantastic ...");
});

app.use('/api', userRouter)
app.use('/api/todos', toDoRouter)

app.listen(process.env.APP_PORT, function () {
  console.log("Server is running on PORT " + process.env.APP_PORT);
});
