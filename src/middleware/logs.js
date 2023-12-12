const logs = (req, res, next) => {
  const start = Date.now();

  // add event listener for event 'finish'. This event is triggered when all response data has been sent to the client
  res.once('finish', () => {
    const delta = Date.now() - start;
    console.log(`${res.statusCode} ${req.method} ${req.baseUrl} ( ${req.url} ) - ${delta}ms`);
  });

  next();
};

module.exports = logs;
