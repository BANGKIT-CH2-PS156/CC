const express = require("express");
const app = express();
const port = 5000;
const response = require("./response");
const router = require('./routes/login')

app.use('/login',router);

app.get("/", (req, res) => {
  response(200, "Response Success", "CH2-PS156 API v.1.0.0 ready to use", res);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

