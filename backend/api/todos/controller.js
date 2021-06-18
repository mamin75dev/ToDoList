const { create, getOne, update, getAll } = require("./service");

function createTodo(req, res) {
  const body = req.body;
  let msg = "";
  if (!body.hasOwnProperty("title")) {
    msg = "title needed!";
  }
  if (!body.hasOwnProperty("due_date")) {
    msg = "due_date needed!";
  }
  if (!body.hasOwnProperty("status")) {
    msg = "status needed!";
  }
  if (!body.hasOwnProperty("priority")) {
    msg = "priority needed!";
  }
  if (msg.length !== 0) {
    return res.status(400).json({
      status: 400,
      message: msg,
      data: [],
    });
  }
  create(req?.user?.id, body, function (err, results) {
    if (err) {
      console.log("createTodo error", err);
      return res.status(500).json({
        status: 500,
        message: err,
      });
    }
    if (!results) {
      return res.status(500).json({
        status: 500,
        message: "Faild to create todo",
        data: [],
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Todo successfully created",
      data: results,
    });
  });
}

function updateTodo(req, res) {
  const body = req.body;
  getOne(req?.user?.id, body.id, function (err, results) {
    if (err) {
      console.log("updateTodo error", err);
      return res.status(500).json({
        status: 500,
        message: err,
      });
    }
    if (!results) {
      return res.status(400).json({
        status: 400,
        message: "todo with this id does not exists",
        data: [],
      });
    }
    update(req?.user?.id, body, function (err, results) {
      if (err) {
        console.log("createTodo error", err);
        return res.status(500).json({
          status: 500,
          message: err,
        });
      }
      if (!results) {
        return res.status(500).json({
          status: 500,
          message: "Faild to update todo",
          data: [],
        });
      }
      return res.status(200).json({
        status: 200,
        message: "Todo successfully updated",
        data: results,
      });
    });
  });
}

function getAllUserTodos(req, res) {
  getAll(req?.user?.id, function (err, results) {
    if (err) {
      console.log("createTodo error", err);
      return res.status(500).json({
        status: 500,
        message: err,
      });
    }
    if (!results) {
      return res.status(500).json({
        status: 500,
        message: "Faild to get todos",
        data: [],
      });
    }
    return res.status(200).json({
      status: 200,
      message: "",
      data: results,
    });
  });
}

function getTodo(req, res) {
  getOne(req?.user?.id, req.params.id, function (err, results) {
    if (err) {
      console.log("getTodo error", err);
      return res.status(500).json({
        status: 500,
        message: err,
      });
    }
    if (!results) {
      return res.status(400).json({
        status: 400,
        message: "todo with this id does not exists",
        data: [],
      });
    }
    return res.status(200).json({
      status: 200,
      message: "",
      data: results,
    });
  });
}

module.exports = {
  createTodo: createTodo,
  editTodo: updateTodo,
  getAllTodos: getAllUserTodos,
  getTodo: getTodo,
};
