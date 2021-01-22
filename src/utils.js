import { adjectives, nouns } from "./words";
import sgMail from "@sendgrid/mail";
import jwt from "jsonwebtoken";

export const secretGenerator = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

export const sendMail = async (msg) => {
  console.log(process.env.SENDGRID_API_KEY);
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  try {
    await sgMail.send(msg);
    console.log("Email Sent");
  } catch (error) {
    console.error(error);
    new Error(error);
  }
};

export const sendSecretMail = async (address, secret) => {
  const msg = {
    from: "imdff0803@gmail.com",
    to: address,
    subject: "Login Secret for Prismagram 🤪",
    html: `Hello! Your login secret is <strong>${secret}</strong>.<br/>Copy paste on the app to login`,
  };

  await sendMail(msg);
};

export const generateToken = (id) => {
  console.log(process.env.JWT_SECRET);
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
