const response = require("./../response");

const notFound = (req, res) => {
  response.res404("URL not found", res);
};

module.exports = notFound;
