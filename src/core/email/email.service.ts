/* eslint-disable @typescript-eslint/no-non-null-assertion */
import BaseService from "../../base/base.service";
import { EmailInterface } from "./email.interface";
import EmailRepository from "./email.repository";
import CreateEmailValidator from "./validators/create.email.validator";
import DeleteEmailValidator from "./validators/delete.email.validator";
import UpdateEmailValidator from "./validators/update.email.validator";
import nodemailer from "nodemailer";
import resetPasswordEmailModel from "./models/reset-login";
import { id } from "../../base/base.repository";
import verifyEmailModel from "./models/verify";


export default class EmailService extends BaseService<EmailInterface> {
	constructor() {
		super(EmailRepository, CreateEmailValidator, UpdateEmailValidator, DeleteEmailValidator);
	}

	async sendCodeSecurityLoginEmail(to: string, token: string, name: string) {
		console.log(token)
		const html = verifyEmailModel(to, token, name)

		const text = token

		return await this.sendEmail({
			to,
			text,
			subject: "Fa Arte - Código de Verificação",
			html
		});
	}



	async sendCodeResetLogin(to: string, id: id | undefined, token: string | undefined, text: string, name: string) {
		const url = `${process.env.DASHBOARD_URL_RESET_PASSWORD}/${id}?token=${token}&code=${text}`;
		const html = resetPasswordEmailModel(url, text, name, to);

		return await this.sendEmail({
			to,
			text,
			subject: "Fa Arte - Resetar senha",
			html
		});
	}

	private async sendEmail(emailConfig: EmailInterface) {
		const transporter = nodemailer.createTransport({
			host: process.env.EMAIL_SMTP,
			port: parseInt(process.env.EMAIL_PORT!),
			secure: true,
			auth: {
				user: process.env.EMAIL_ADDRESS,
				pass: process.env.EMAIL_PASSWORD,
			},
		});

		const info = await transporter.sendMail({
			from: process.env.EMAIL_ADDRESS,
			to: emailConfig.to,
			subject: emailConfig.subject,
			text: emailConfig.text,
			html: emailConfig.html
		});

		if (info.messageId) {
			return info.messageId;
		}

		return undefined;
	}
}