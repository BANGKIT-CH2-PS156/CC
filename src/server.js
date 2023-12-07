require("dotenv").config();
const port = process.env.PORT || 9000;
const app = require("./app");

app.listen(port, () => {
  console.log(`Server running at ${process.env.DOMAIN}`);
});
