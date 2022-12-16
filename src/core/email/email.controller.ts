import { Request, Response } from "express";
import EmailService from "./email.service";

export const sendCodeSecurityLoginEmail = async (req: Request, res: Response) => {
	const emailService = new EmailService();
	const { email, text, name } = req.body;
	const data = await emailService.sendCodeSecurityLoginEmail(email, text, name);

	return res.send(data);
};