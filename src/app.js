const express = require("express");
const app = express();

//call middleware
const notFound = require("./middleware/not-found");
const logs = require("./middleware/logs");
const upload = require("./middleware/upload");

//call router
const rootRouter = require("./routes/root");
const usersRouter = require("./routes/users");
const gcpUpload = require("./middleware/uploadgcp");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/assets/", express.static("public/images"));

//create log from client
app.use(logs);

//use router
app.use("/", rootRouter);
app.use("/users", usersRouter);
app.post("/upload", upload.single("photo"), (req, res) => {
  res.json({
    message: "Success Upload",
  });
});

app.use(gcpUpload);

//use page page not found
app.use(notFound);

module.exports = app;
