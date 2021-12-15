
const nodemailer = require('nodemailer');
class MailService {
  public transporter: any;

  constructor() {
        this.transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PASSWORD,
          secure: false,
          auth: {
              user: process.env.SMTP_USER,
              password: process.env.SMTP_PASSWORD
          }
        });
  }

  async sendActivationMain(to: string, link: string) {
        await this.transporter.sendMail({
          from: process.env.SMTP_USER,
          to,
          subject: 'Активация аккаунта на ' + process.env,
          text: '',
          html:
            `
            <div>
            <h1>Для активации перейдите по ссылке</h1>
            <a href="${link}">{link}</a>
            </div>
            `
        })
  }
}

export const mailService = new MailService();

