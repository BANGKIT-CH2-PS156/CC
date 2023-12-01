const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//call middleware
const notFound = require("./middleware/not-found");
const logs = require("./middleware/logs");

//call router
const rootRouter = require("./routes/root");
const usersRouter = require("./routes/users");

//create log from client
app.use(logs);

//use router
app.use("/", rootRouter);
app.use("/users", usersRouter);

//use page page not found
app.use(notFound);

module.exports = app;
