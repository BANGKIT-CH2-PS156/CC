const express = require("express");
const app = express();

//call middleware
const notFound = require("./middleware/not-found");
const logs = require("./middleware/logs");
const { auth } = require("./middleware/authorization");

//call router
const rootRouter = require("./routes/root");
const usersRouter = require("./routes/users");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//create log from client
app.use(logs);

//use router
app.use("/", rootRouter);
app.use("/users", auth, usersRouter);

//use page page not found
app.use(notFound);

module.exports = app;
