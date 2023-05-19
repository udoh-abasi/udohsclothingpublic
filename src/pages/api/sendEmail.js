import { createTransport } from "nodemailer";

// This function generates 6 random numbers, that we will use to verify a user's email when checking out as guest
const getSixRandomNumber = () => {
  let allNumb = "";
  for (let index = 0; index < 6; index++) {
    const randomNumber = Math.floor(Math.random() * 10);
    allNumb = allNumb + randomNumber;
  }
  return allNumb;
};

const sendEmail = (req, res) => {
  if (req.method === "POST") {
    const { to } = req.body;

    const transport = createTransport({
      service: "gmail",
      auth: {
        user: "tropyganty0@gmail.com",
        pass: process.env.TROPYGANTY0_APP_PASSWORD,
      },
    });

    const code = getSixRandomNumber();

    const mailOptions = {
      from: "tropyganty0@gmail.com",
      to,
      subject: "Your Verification Code",
      text: `Your confirmation code is ${code}`,
    };

    transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        res
          .status(404)
          .json({ message: "There was an error sending the mail" });
      } else {
        console.log(info.response);
        res.status(200).json({ code });
      }
    });
  } else {
    res.status(404).json({ message: "Method not allowed" });
  }
};

export default sendEmail;
