const path = require('path');
const ejs = require('ejs');
const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

function getSmtpConfig() {
  const host = process.env.SMTP_HOST || 'smtp-relay.sendinblue.com';
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USERNAME || process.env.SMPT_USERNAME;
  const pass = process.env.SMTP_PASSWORD || process.env.SMPT_PASSWORD;
  return { host, port, user, pass };
}

async function createTransporter() {
  const { host, port, user, pass } = getSmtpConfig();
  logger.debug({ host, port }, 'creating SMTP transporter');
  return nodemailer.createTransport({
    host,
    port,
    auth: {
      type: 'Login',
      user,
      pass
    }
  });
}

async function renderTemplate(templateName, data) {
  const templatePath = path.join(__dirname, '../public/html', templateName);
  logger.debug({ template: templateName }, 'rendering EJS template');
  return ejs.renderFile(templatePath, data);
}

async function sendEmail({ to, subject, html }) {
  const from = process.env.EMAIL_FROM || 'rahulsaini2261999@pepisandbox.com';
  const transporter = await createTransporter();
  await transporter.sendMail({ from, to, subject, html });
  logger.info({ to, subject }, 'email sent');
}

async function sendVerificationEmail({ userName, email, verifyPath }) {
  logger.info({ email }, 'sending verification email');
  const html = await renderTemplate('email.ejs', {
    user: userName,
    email,
    pathname: verifyPath
  });
  await sendEmail({ to: email, subject: 'Verify your email', html });
}

async function sendForgotPasswordEmail({ email, resetPath }) {
  logger.info({ email }, 'sending forgot password email');
  const html = await renderTemplate('forgotpass.ejs', {
    email,
    pathname: resetPath
  });
  await sendEmail({ to: email, subject: 'Forgot Password', html });
}

module.exports = {
  sendVerificationEmail,
  sendForgotPasswordEmail
};


