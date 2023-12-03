const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const response = require("../response");
const userModel = require("./../model/users");

const root = (req, res) => {
  response.res200("CH2-PS156 API v.1.0.0 ready to use", res);
};

const register = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    //check req is not empty
    if (!email || !password) {
      response.res400("Please input email or password", res);
      return;
    }
    //check password input
    if (password !== confirmPassword) {
      return response.res400("Password is not same", res);
    }
    //check email in database is already or not
    const [[data]] = await userModel.oneUser(email);
    if (data) {
      console.log(data.email);
      return response.res400("User is already exists", res);
    }
    //Insert new data to database
    const pwHashed = await bcrypt.hash(password, 11);
    await userModel.addUser(email, pwHashed);
    response.res201("Data successfully created", res);
  } catch (error) {
    response.res500(null, res);
    console.log(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check req is not empty
    if (!email || !password) {
      response.res400("Please input email or password", res);
      return;
    }
    //check email in database
    const [[data]] = await userModel.oneUser(email);
    if (!data) {
      return response.res403("User not Found", res);
    }
    //check password in database
    const check = await bcrypt.compare(password, data.password);
    if (!check) {
      return response.res403("Incorrect Password", res);
    }
    //give token
    const payload = { id: data.id, email: data.email };
    const expiresIn = 60 * 60 * 1; //1 hour
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: expiresIn,
    });
    console.log(token);
    response.res200(token, res);
  } catch (error) {
    response.res500(null, res);
    console.log(error.message);
  }
};

module.exports = { root, register, login };
