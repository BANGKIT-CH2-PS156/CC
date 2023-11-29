const response = require("../../response");

const register = (req, res) => {
  response(200, "Response success", "Register Page", res);
};

const login = (req, res) => {
  response(200, "Response success", "Login Page", res);
};

module.exports = { register, login };
