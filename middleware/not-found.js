const response = require("./../response");

const notFound = (req, res) => {
  response(404, "URL not Found", null, res);
};

module.exports = notFound;
