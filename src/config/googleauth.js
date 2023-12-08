const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.AUTH_GOOGLE_CALLBACK
);

const oAuth2ClientMail = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI_MAIL
);

const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

//send gmail
const sendMail = async (userTarget) => {
  oAuth2ClientMail.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
  try {
    const accessToken = await oAuth2ClientMail.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MY_EMAIL,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    //encrypt email di use in parameter link
    const emailEncrypt = Buffer.from(userTarget).toString("base64");
    const link = `${process.env.DOMAIN}/verify/${emailEncrypt}`;
    const mailOptions = {
      from: `CoffeeGit Team <yours authorised email ${process.env.MY_EMAIL}>`,
      to: userTarget,
      subject: "User Email Verification",
      text: "Bismillah, email verify",
      html: `<h3>Email Verification</h3><p>Hello coffee lover, please verify your email to start great experience with us. Click link: <a href="${link}"><i>${link}</i></a></p>`,
    };

    const result = await transport.sendMail(mailOptions);
    console.log(`Send email verification to ${userTarget}`);
    return result;
  } catch (error) {
    console.log(error)
    return error;
  }
};

module.exports = { google, oauth2Client, scopes, sendMail };
