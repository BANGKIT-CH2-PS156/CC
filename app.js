const express = require("express");
const app = express();

const notFound = require("./middleware/not-found");

const rootRouter = require("./routes/root/router");
const authRouter = require("./routes/auth/router");
const usersRouter = require("./routes/users/router");

//create log from client
app.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl} ${req.url} - ${delta}ms`);
});

app.use("/", rootRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);

app.use(notFound);

module.exports = app;
