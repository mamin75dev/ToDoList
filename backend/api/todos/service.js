const pool = require("../../config/database");

function createTodo(data, callBack) {
  const { title = "", description = "", due_date, status, priority } = data;
  const sql = `insert into todos (title, description, due_date, status, priority)`;
  pool.query(
    sql,
    [title, description, due_date, status, priority],
    function (error, results, fields) {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
}

function updateTodo(data, callBack) {
  const arr = [];
  let sql = `update todos set `;
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
  sql += `where id = ?`;
  pool.query(sql, arr, function (error, results, fields) {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results[0]);
  });
}

function getTodosForUser(data, callBack) {}

function getTodoDetails(id, callBack) {
  const sql = `select * from todos where id = ?`
  pool.query(sql, [id], function (error, results, fields) {
    if (error) {
      return callBack(error)
    }
    return callBack(null, results[0])
  })
}

module.exports = {
  create: createTodo,
};
