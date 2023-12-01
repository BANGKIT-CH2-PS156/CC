const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const response = require("../response");
const userModel = require("./../model/users");

const root = (req, res) => {
  response(200, "Response Success", "CH2-PS156 API v.1.0.0 ready to use", res);
};

const register = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    //check req is not empty
    if (!email || !password) {
      response(400, "Bad Request", "Please input email or password", res);
      return;
    }
    //check password input
    if (password !== confirmPassword) {
      return response(400, "Bad Request", "Password is not same", res);
    }
    //check email in database is already or not
    const [[data]] = await userModel.oneUser(email);
    if (data) {
      console.log(data.email);
      return response(400, "Bad Request", "User is already exists", res);
    }
    //Insert new data to database
    const pwHashed = await bcrypt.hash(password, 11);
    await userModel.addUser(email, pwHashed);
    response(201, "Created", "Data successfully created", res);
  } catch (error) {
    response(500, "Internal Server Error", null, res);
    console.log(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check req is not empty
    if (!email || !password) {
      response(400, "Bad Request", "Please input email or password", res);
      return;
    }
    //check email in database
    const [[data]] = await userModel.oneUser(email);
    if (!data) {
      return response(403, "Forbidden", "User not Found", res);
    }
    //check password in database
    const check = await bcrypt.compare(password, data.password);
    if (!check) {
      return response(403, "Forbidden", "Incorrect Password", res);
    }
    //give token
    const token = jwt.sign(
      {
        id: data.id,
        email: data.email,
      },
      "secret",
      { expiresIn: "1h" }
    );
    console.log(token);
    response(200, "OK", token, res);
  } catch (error) {
    response(500, "Internal Server Error", null, res);
    console.log(error.message);
  }
};

module.exports = { root, register, login };
