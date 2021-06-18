const pool = require("../../config/database");

function createTodo(user_id, data, callBack) {
  const { title = "", description = "", due_date, status, priority } = data;
  const sql = `insert into todos (title, description, due_date, status, priority, user_id) values (?, ?, ?, ? ,? ,?)`;
  pool.query(
    sql,
    [title, description, due_date, status, priority, user_id],
    function (error, results, fields) {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
}

function updateTodo(user_id, data, callBack) {
  const arr = [];
  let sql = `update todos set `;
  const id = data.id;
  delete data.id;
  for (let i = 0; i < Object.keys(data).length; i++) {
    sql += `${Object.keys(data)[i]} = ?`;
    if (i < Object.keys(data).length - 1) {
      sql += ", ";
    } else {
      sql += " ";
    }
    arr.push(Object.values(data)[i]);
  }
  /**
   * double check this code for id ::
   * where id id set and push to array for next line?
   */
  sql += `where id = ${id} and user_id = ${user_id}`;
  pool.query(sql, arr, function (error, results, fields) {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
}

function getTodosForUser(user_id, callBack) {
  const sql = `select id, title, due_date, status, priority from todos where user_id = ${user_id}`;
  pool.query(sql, [], function (error, results, fields) {
    if (error) {
      return callBack(error);
    } else {
      return callBack(null, results);
    }
  })
}

function getTodoDetails(user_id, id, callBack) {
  const sql = `select * from todos where id = ? and user_id = ?`;
  pool.query(sql, [id, user_id], function (error, results, fields) {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
}

module.exports = {
  create: createTodo,
  update: updateTodo,
  getAll: getTodosForUser,
  getOne: getTodoDetails,
};
