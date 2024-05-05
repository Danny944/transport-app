const nodemailer = require("nodemailer");
require("dotenv").config();

async function sendSignUpEmail(recipient) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_MAIL,
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.GOOGLE_MAIL,
    to: recipient,
    subject: "🎉 SignUp Successful with DANNY PHATHOM TESTS 🎉",
    html: `
        <html>
          <head>
            <style>
              .container {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                padding: 20px;
                border-radius: 10px;
                text-align: center;
              }
              h1 {
                color: #333333;
              }
              p {
                color: #666666;
              }
              .footer {
                margin-top: 20px;
                color: #999999;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>🎉 Thank You for Signing Up! 🎉</h1>
              <p>Welcome to DANNY PHATHOM TESTS. We're excited to have you onboard.</p>
              <p>Get ready to explore and learn!</p>
              <div class="footer">
                <p>If you have any questions, feel free to contact us at support@dannyphathomtests.com</p>
              </div>
            </div>
          </body>
        </html>
      `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.log(error);
    throw new Error("Email could not be sent.");
  }
}

module.exports = {
  sendSignUpEmail,
};
