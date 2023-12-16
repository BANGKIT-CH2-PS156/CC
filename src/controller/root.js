const moment = require("moment-timezone");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const response = require("./../response");
const userModel = require("./../model/users");
const blacklist = require("./../config/blacklist");
const {
  google,
  oauth2Client,
  scopes,
  sendMail,
} = require("../config/googleauth");

const currentTime = moment().format("YYYYMMDD-HHmmss");

const root = (req, res) => {
  response.res200Msg("CH2-PS156 API v.1.0.0 ready to use", res);
};

//register new account
const register = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    //check input is not empty
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
    //send verification email
    try {
      sendMail(email, "verify-email");
    } catch (error) {
      console.log("Failed to send verification email");
      console.log(error);
      response.res500(res);
    }
    //Insert new data to database
    const pwHashed = await bcrypt.hash(password, 11);
    await userModel.addUser(email, pwHashed);
    response.res201("Data successfully added", res);
  } catch (error) {
    console.log(error.message);
    response.res500(res);
  }
};

//verify account
const verifyEmail = async (req, res) => {
  const { email } = req.params;
  const emailVerify = Buffer.from(email, "base64").toString("utf-8");
  try {
    //check verify account
    const [[user]] = await userModel.oneUser(emailVerify);
    if (user.verify) {
      return res.redirect("/verify/fail");
    }
    //verifying email
    await userModel.verifyEmail(emailVerify);
    console.log(`Successfully verify ${emailVerify}`);
    res.redirect("/verify/success");
  } catch (error) {
    console.log(error.message);
    response.res500(res);
  }
};

//user login
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
    //check verify account
    if (!data.verify) {
      return response.res403(
        "Please verify your email first - check your email inbox",
        res
      );
    }
    //give token
    const payload = { id: data.id, email: data.email, entryTime: currentTime };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    }); //set token with expires 2 hours

    const user = {
      id: data.id,
      email: data.email,
      name: data.name,
    };
    response.resLogin(user, token, res);
  } catch (error) {
    response.res500(res);
    console.log(error.message);
  }
};

//google redirect to authorization google account
const googleAuthorization = async (req, res) => {
  try {
    const { code } = req.query;
    //check if callback from google is not yet
    if (!code) {
      const authUrl = oauth2Client.generateAuthUrl({
        access_type: "online",
        scope: scopes,
        include_granted_scopes: true,
      });
      console.log("User login via google account...");
      return res.redirect(authUrl);
    }
    //set response to client and give token when google give callback
    const { tokens } = await oauth2Client.getToken(code.toString());

    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });

    const { data } = await oauth2.userinfo.get();

    if (!data.email || !data.name) {
      console.log(data);
      return response.res500(res);
    }

    //give token
    const payload = { id: data.id, email: data.email, entryTime: currentTime };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "3h",
    }); //set token with expires 3 hours
    const user = {
      email: data.email,
      name: data.name,
    };
    //check user in database
    const [[userExists]] = await userModel.oneUser(data.email);
    if (!userExists) {
      await userModel.addUserGoogle(data.email, data.name, data.picture);
    }
    return response.resLogin(user, token, res);
  } catch (error) {
    response.res500(res);
    console.log(error.message);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    //check input is not empty
    if (!email) {
      return response.res400("Please input email", res);
    }
    //check email in database is already or not
    const [[data]] = await userModel.oneUser(email);
    if (!data) {
      // return response.res403("User not Found", res);
      return res.redirect("/sending/fail");
    }
    //send verification email
    try {
      sendMail(email, "reset-password");
      res.redirect("/sending/success");
    } catch (error) {
      console.log("Failed to send verification email");
      console.log(error);
      response.res500(res);
    }
  } catch (error) {
    console.log(error.message);
    response.res500(res);
  }
};

//verify account
const resetPassword = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  const emailUser = Buffer.from(email, "base64").toString("utf-8");
  try {
    //check password input
    if (password !== confirmPassword) {
      // return response.res400("Password is not same", res);
      return res.redirect(`reset/fail/${email}`);
    }
    //check email in database is already or not
    const [[data]] = await userModel.oneUser(emailUser);
    if (!data) {
      return response.res403("User not Found", res);
    }
    //Insert new data to database
    const pwHashed = await bcrypt.hash(password, 11);
    await userModel.updatePassword(emailUser, pwHashed);
    console.log(`Successfully reset password ${emailUser}`);
    res.redirect("/reset/success");
  } catch (error) {
    console.log(error.message);
    response.res500(res);
  }
};

const logout = (req, res) => {
  try {
    const { authorization } = req.headers;
    const maxBlacklist = 50;

    if (blacklist.length >= maxBlacklist) {
      blacklist.splice(0, 25); //delete token blacklist as many as 25 data starting from index 0
    }

    //add token to blacklist
    blacklist.push(authorization);

    response.res200Msg("Logout successful", res);
  } catch (error) {
    console.log(error);
    response.res500(res);
  }
};

module.exports = {
  root,
  register,
  verifyEmail,
  login,
  googleAuthorization,
  sendMail,
  logout,
  forgotPassword,
  resetPassword,
};
