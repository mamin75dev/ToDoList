const { create, update } = require("./service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

const { getByEmail } = require("./service");

function createUser(req, res) {
  const body = req.body;
  const salt = genSaltSync(10);
  let msg = "";
  if (!body.hasOwnProperty("first_name")) {
    msg = "first_name needed!";
  }
  if (!body.hasOwnProperty("last_name")) {
    msg = "last_name needed!";
  }
  if (!body.hasOwnProperty("email")) {
    msg = "email needed!";
  }
  if (!body.hasOwnProperty("password")) {
    msg = "password needed!";
  }
  if (msg.length !== 0) {
    return res.status(400).json({
      status: 400,
      message: msg,
      data: [],
    });
  }
  body.password = hashSync(body.password, salt);
  create(body, function (err, results) {
    if (err) {
      console.log('createUser error', err);
      return res.status(500).json({
        status: 500,
        message: err,
      });
    }
    if (!results) {
      return res.status(500).json({
        status: 500,
        message: "Faild to create user",
        data: [],
      });
    }
    return res.status(200).json({
      status: 200,
      message: "User successfully created",
      data: results,
    });
  });
}

function updateUser(req, res) {

  const body = req.body;
  if (body.hasOwnProperty('password')) {
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
  }
  update(req?.user?.id, body, function (err, results) {
    if (err) {
      console.log('updateUser error', err);
      return res.status(500).json({
        status: 500,
        message: err,
      });
    }
    if (!results) {
      return res.status(500).json({
        status: 500,
        message: "Faild to update user",
        data: [],
      });
    }
    return res.status(200).json({
      status: 200,
      message: "User successfully updated",
      data: results,
    });
  });
}

function userLogin(req, res) {
  const body = req.body;
  getByEmail(body.email, function (err, results) {
    if (err) {
      console.log('userLogin error', err);
      return res.status(500).json({
        status: 500,
        message: err,
      });
    }
    if (!results) {
      return res.status(400).json({
        status: 400,
        message: "Invalid email or password",
        data: [],
      });
    }
    if (compareSync(body.password, results.password)) {
      results.password = undefined;
      const jsonToken = sign({ result: results }, process.env.JSON_TOKEN_KEY, {
        expiresIn: "1w",
      });
      return res.status(200).json({
        status: 200,
        message: "login successful",
        data: {
          access_token: jsonToken,
        },
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "Invalid email or password",
        data: [],
      });
    }
  });
}

module.exports = {
  createUser: createUser,
  updateUser: updateUser,
  userLogin: userLogin,
};
