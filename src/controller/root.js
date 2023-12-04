const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const response = require("../response");
const userModel = require("./../model/users");
const {
  google,
  oauth2Client,
  scopes,
  sendMail,
} = require("../config/googleauth");

const root = (req, res) => {
  response.res200("CH2-PS156 API v.1.0.0 ready to use", res);
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
      sendMail(email);
    } catch (error) {
      console.log("Failed to send verification email");
      console.log(error);
      response.res500(null, res);
    }
    //Insert new data to database
    const pwHashed = await bcrypt.hash(password, 11);
    await userModel.addUser(email, pwHashed);
    response.res201("Data successfully created", res);
  } catch (error) {
    console.log("Registration failed");
    console.log(error.message);
    response.res500(null, res);
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
      return response.res400("Email has been verified", res);
    }
    //verifying email
    await userModel.verifyEmail(emailVerify);
    console.log(`Successfully verify ${emailVerify}`);
    response.res201(`Successfully verify ${emailVerify}`, res);
  } catch (error) {
    console.log(error.message);
    response.res500(null, res);
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

//google redirect to authorization google account
const googleAuthorization = (req, res) => {
  try {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
      include_granted_scopes: true,
    });
    res.redirect(authUrl);
  } catch (error) {
    response.res500(null, res);
    console.log(error.message);
  }
};

//callback from google after authentication
const googleCallback = async (req, res) => {
  try {
    const { code } = req.query;

    const { tokens } = await oauth2Client.getToken(code.toString());

    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });

    const { data } = await oauth2.userinfo.get();

    if (!data.email || !data.name) {
      return res.json({
        data: data,
      });
    }

    //give token
    const payload = { id: data.id, email: data.email };
    const expiresIn = 60 * 60 * 1; //1 hour
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: expiresIn,
    });

    const user = {
      name: data.name,
      email: data.email,
      img: data.picture,
      verify: 1,
    };
    console.log({ user, token });
    return response.res200(token, res);
  } catch (error) {
    response.res500(null, res);
    console.log(error.message);
  }
};

module.exports = {
  root,
  register,
  verifyEmail,
  login,
  googleAuthorization,
  googleCallback,
  sendMail,
};
