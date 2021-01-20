import { adjectives, nouns } from "./words";
import sgMail from "@sendgrid/mail";

export const secretGenerator = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

export const sendMail = (msg) => {
  console.log(process.env.SENDGRID_API_KEY);
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email Sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

export const sendSecretMail = (address, secret) => {
  const msg = {
    from: "imdff0803@gmail.com",
    to: address,
    subject: "Login Secret for Prismagram 🤪",
    html: `Hello! Your login secret is ${secret}.<br/>Copy paste on the app to login`,
  };

  sendMail(msg);
};
