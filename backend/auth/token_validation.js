const { verify } = require("jsonwebtoken");

function checkToken(req, res, next) {
  let token = req.get("authorization");
  if (token) {
    token = token.slice(7);
    verify(token, process.env.JSON_TOKEN_KEY, function (err, decoded) {
      if (err) {
        res.status(401).json({
          status: 401,
          message: "Unauthorized. Access denied",
          data: [],
        });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({
      status: 401,
      message: "Unauthorized. Access denied",
      data: [],
    });
  }
}

module.exports = {
  checkToken: checkToken,
};
