const mailer = require("nodemailer");

//udf

const sendingMail = async (to, subject, text) => {
  const transport = mailer.createTransport({
    service: "gmail",
    auth: {
      user: "pythonforsamir@gmail.com",
      pass: "njaa gmdh hgrs snac",
    },
  });
  const mailOptions = {
    from: "pythonforsamir@gmail.com",
    to: to,
    subject: subject,
    html: `<h1>${text}</h1>`
  };

  const mailResponse = await transport.sendMail(mailOptions);
  console.log(mailResponse.messageId);
};

//sendingMail("samir.vithlani83955@gmail.com","WELCOME","Welcome to .....")
module.exports = sendingMail


