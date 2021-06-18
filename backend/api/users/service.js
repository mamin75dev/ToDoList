const pool = require("../../config/database");

function createUser(data, callBack) {
  const sql = `insert into users (first_name, last_name, email, password) values  (?, ?, ?, ?)`;
  pool.query(
    sql,
    [data.first_name, data.last_name, data.email, data.password],
    function (error, results, fields) {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
}

function updateUser(id, data, callBack) {
  const arr = [];
  // const sql = `update users set first_name = ?, last_name = ?, email = ?, password = ?, where id = ?`;
  let sql = `update users set `;
  for (let i = 0; i < Object.keys(data).length; i++) {
    sql += `${Object.keys(data)[i]} = ?`;
    if (i < Object.keys(data).length - 1) {
      sql += ", ";
    } else {
      sql += " ";
    }
    arr.push(Object.values(data)[i]);
  }
  sql += `where id = ${id}`;
  pool.query(sql, arr, function (error, results, fields) {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results);
  });
}

function getByEmail(email, callBack) {
  const sql = `select * from users where email = ?`;
  pool.query(sql, [email], function (error, results, fields) {
    if (error) {
      return callBack(error);
    }
    return callBack(null, results[0]);
  });
}

module.exports = {
  create: createUser,
  update: updateUser,
  getByEmail: getByEmail,
};
