const nodemailer = require('nodemailer');

class MailService {
   transporter: any;

  constructor() {
        this.transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
              user: 'oleg14ua71@gmail.com',
              pass: ''
          }
        });
  }

  async sendActivationMain(to: string, link: string) {

        await this.transporter.sendMail({
          from: 'oleg14ua71@gmail.com',
          to: to,
          subject: 'Активация аккаунта на ' + 'http://localhost:8000',
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

module.exports = new MailService();

