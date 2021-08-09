const tokenChek = require("../token");

module.exports.tokenChecking = (req, res, next) => {
  const { token } = req.headers;
  try {
    tokenChek.verifyToken(token);
  } catch (err) {
    return res.status(404).send("Token is out of date or invalid");
  }

  return next();
};
