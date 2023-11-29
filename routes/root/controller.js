const response = require("../../response");

const root = (req, res) => {
  response(200, "Response Success", "CH2-PS156 API v.1.0.0 ready to use", res);
};

module.exports = root;
