const response = (statusCode, message, data, res) => {
  res.status(statusCode).json({
    status: statusCode,
    message: message,
    data: data,
  });
};

module.exports=response;