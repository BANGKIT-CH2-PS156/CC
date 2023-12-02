const response = (statusCode, message, data, res) => {
  res.status(statusCode).json({
    status: statusCode,
    message,
    data,
  });
};

module.exports = response;