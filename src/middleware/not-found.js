const response = require("./../response");

const notFound = (req, res) => {
  response.res404("Sorry URL is not exist", res);
};

module.exports = notFound;
