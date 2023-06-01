import { createTransport } from "nodemailer";

const sendContactEmail = (req, res) => {
  if (req.method === "POST") {
    const { from, name, message } = req.body;

    const transport = createTransport({
      service: "gmail",
      auth: {
        user: "tropyganty0@gmail.com",
        pass: process.env.TROPYGANTY0_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from,
      to: "tropyganty0@gmail.com",
      subject: "Contact",
      text: `
        Name: ${name}
        From: ${from}
        
        Message: ${message}
        `,
    };

    transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        res
          .status(404)
          .json({ message: "There was an error sending the mail" });
      } else {
        console.log(info.response);
        res.status(200).json({ message: "Email sent" });
      }
    });
  } else {
    res.status(404).json({ message: "Method not allowed" });
  }
};

export default sendContactEmail;
