const router = require("express").Router();
const { createTodo, editTodo, getAllTodos, getTodo } = require("./controller");
const { checkToken } = require("../../auth/token_validation");

router.post("/create", checkToken, createTodo);
router.patch("/edit", checkToken, editTodo);
router.get("/all", checkToken, getAllTodos);
router.get("/:id", checkToken, getTodo);

module.exports = { router: router };
