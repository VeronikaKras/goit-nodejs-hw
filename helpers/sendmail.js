const sgMAIL = require("@sendgrid/mail");
const { SENDGRID_API_KEY } = process.env;
sgMAIL.setApiKey(SENDGRID_API_KEY);
const sendmail = async (data) => {
  const email = { ...data, from: "nikakras.dance@gmail.com" };
  await sgMAIL.send(email);
  return true;
};

module.exports = sendmail;
