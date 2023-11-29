const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//call page note found
const notFound = require("./middleware/not-found");

//call router
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

//use router
app.use("/", rootRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);

//use page page not found
app.use(notFound);

module.exports = app;
