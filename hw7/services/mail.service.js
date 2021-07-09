const nodeMailer = require('nodemailer');
const path = require('path');
const EmailTemplates = require('email-templates');

const { EMAIL, PASSWORD } = require('../constants/const');
const { ErrorHandler, errorMessages } = require('../errors');
const templateInfo = require('../email-templaes');

const templateParser = new EmailTemplates({
  views: {
    root: path.join(process.cwd(), 'email-templaes')
  }
});

const transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL,
    pass: PASSWORD
  }
});

const sendMail = async (userMail, action, context = {}) => {
  const templateToSend = templateInfo[action];

  if (!templateToSend) {
    throw new ErrorHandler(200, errorMessages.WRONG_TEMPLATE.message, errorMessages.WRONG_TEMPLATE.code);
  }

  const html = await templateParser.render(templateToSend.templateName, context);

  return transporter.sendMail({
    from: 'No Reply',
    to: userMail,
    subject: templateToSend.subject,
    html
  });
};
// const sendMail = async (userMail) => {
//   await transporter.sendMail({
//     from: 'No Reply',
//     to: userMail,
//     subject: 'hello world',
//     html: '<div>hello</div>'
//   });
// };

module.exports = {
  sendMail
};
