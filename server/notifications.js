const nodemailer = require('nodemailer');
const OneSignal = require('onesignal-node');

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'kareem.sawayn@ethereal.email',
      pass: 'u6xHkYAM7WkM5BqM1A'
  }
});

// OneSignal configuration
const oneSignalClient = new OneSignal.Client({
  userAuthKey: 'ONESIGNAL_USER_AUTH_KEY',
  app: { appAuthKey: 'ONESIGNAL_APP_AUTH_KEY', appId: 'ONESIGNAL_APP_ID' }
});

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    await transporter.sendMail({
      from: '"Rent-Trust-Pro" <noreply@rent-trust-pro.com>',
      to,
      subject,
      text,
      html,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const sendPushNotification = async ({ heading, content, external_id }) => {
  const notification = {
    contents: {
      en: content,
    },
    headings: {
      en: heading,
    },
    include_external_user_ids: [external_id],
  };

  try {
    await oneSignalClient.createNotification(notification);
    console.log('Push notification sent successfully');
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
};

module.exports = { sendEmail, sendPushNotification };
