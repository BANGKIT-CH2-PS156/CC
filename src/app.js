const express = require("express");
const app = express();
const path = require("path");
const favicon = require("express-favicon");

//call middleware
const notFound = require("./middleware/not-found");
const logs = require("./middleware/logs");
const { auth } = require("./middleware/authorization");

//call router
const rootRouter = require("./routes/root");
const usersRouter = require("./routes/users");
const predictRouter = require("./routes/predict");
const postingRouter = require("./routes/posting");
const commentRouter = require("./routes/comment");
const chatRouter = require("./routes/chat");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(favicon(path.join(__dirname, "../public/img/favicon.ico")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//create log from client
app.use(logs);

app.get("/verify/success", (req, res) => {
  res.render("verify");
});
app.get("/verify/fail", (req, res) => {
  res.render("verify-fail");
});
app.get("/forgot-password", (req, res) => {
  res.render("forgot-password");
});
app.get("/reset-password/:email", (req, res) => {
  const { email } = req.params;
  res.render("reset-password", { email });
});
app.get("/reset/success", (req, res) => {
  res.render("reset-success");
});
app.get("/reset/fail/:email", (req, res) => {
  const {email} = req.params;
  res.render("reset-fail", {email});
});
app.get("/sending/success", (req, res) => {
  res.render("send-success");
});
app.get("/sending/fail", (req, res) => {
  res.render("send-fail");
});

//use router
app.use("/", rootRouter);
app.use("/users", auth, usersRouter);
app.use("/predict", auth, predictRouter);
app.use("/posting", auth, postingRouter);
app.use("/comment", auth, commentRouter);
app.use("/chat", auth, chatRouter);

//use page page not found
app.use(notFound);

module.exports = app;
