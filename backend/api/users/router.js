const router = require("express").Router();
const { createUser, updateUser, userLogin } = require("./controller");
const { checkToken } = require("../../auth/token_validation");

router.post("/signin", createUser);
router.post("/login", userLogin);
router.patch("/profile/edit", checkToken, updateUser);

module.exports = { router: router };
