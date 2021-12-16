const nodemailer = require('nodemailer');

class MailService {
  public transporter: any;

  constructor() {
        this.transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          secure: false,
          auth: {
              user: process.env.SMTP_USER,
              password: process.env.SMTP_PASSWORD
          }
        });
  }

  async sendActivationMain(to: string, link: string) {
  console.log(to, link, process.env.SMTP_USER, process.env.API_URL,)
        await this.transporter.sendMail({
          from: process.env.SMTP_USER,
          to: to,
          subject: 'Активация аккаунта на ' + process.env.API_URL,
          text: '',
          html:
            `
            <div>
            <h1>Для активации перейдите по ссылке</h1>
            <a href="${link}">{link}</a>
            </div>
            `
        })
    console.log(link)
  }
}

module.exports = new MailService();

