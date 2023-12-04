const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const response = require("../response");
const userModel = require("./../model/users");
const {
  nodemailer,
  google,
  oauth2Client,
  scopes,
  oAuth2ClientMail,
} = require("../config/googleauth");

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

//google redirect to authorization google account
const googleAuthorization = (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    include_granted_scopes: true,
  });
  console.log("Redirect...");
  res.redirect(authUrl);
};

//callback from google after authentication
const googleCallback = async (req, res) => {
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

  console.log(data);
  return res.json({
    data: data,
  });
};

//send gmail
const sendMail = async (req, res) => {
  oAuth2ClientMail.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
  try {
    const accessToken = await oAuth2ClientMail.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "c614bsy3787@bangkit.academy",
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "Fajri <yours authorised email c614bsy3787@bangkit.academy>",
      to: "theflashyellow45@gmail.com",
      subject: "Hello from gmail using API 2",
      text: "Hello from gmail email using API 2",
      html: "<h1>Hello from gmail email using API 2</h1>",
    };

    const result = await transport.sendMail(mailOptions);
    console.log(result);
    res.send("berhasil mengirim email");
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  root,
  register,
  login,
  googleAuthorization,
  googleCallback,
  sendMail,
};
