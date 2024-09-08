import nodemailer from "nodemailer";
import { config } from "../config/mailer.config.js";

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.mailer.host,
      port: config.mailer.port,
      auth: config.mailer.auth,
    });
  }

  getMessageTemplate(type, name) {
    let body = "";

    switch (type) {
      case "welcome":
        body += `Bienvenido ${name} !
                
                Gracias por registrarse en SB
                `;
        break;

      case "purchase":
        body += `Gracias por tu compra ${name} !
                
                Pronto recibiras tu pedido en la dirección indicada.
                `;
        break;

      default:
        body += `Mensaje a  ${name} !
                
                Servicio de Mensajeria de SB
                `;
        break;
    }

    body += `Saludos! `;

    return body;
  }

  async sendMail({ to, subject, type, name }) {
    const message = this.getMessageTemplate(type, name);

    const info = await this.transporter.sendMail({
      from: "santiagobeiro",
      to,
      subject,
      html: message,
      attatchments: [],
    });
    console.log(message);
  }
}

export default MailService;