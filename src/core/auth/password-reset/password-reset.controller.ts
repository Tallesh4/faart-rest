import { Request, Response } from "express";
import PasswordResetService from "./password-reset.service";

export const resetPassword = async (req: Request, res: Response) => {
	const passwordResetService = new PasswordResetService();

	const { token, password, code } = req.body;
	const { id } = req.params;
    
	const tokens = await passwordResetService.resetPassword(id, token, code, password);
	res.send(tokens);
};

export const create = async (req: Request, res: Response) => {
	const passwordResetService = new PasswordResetService();

	const { username } = req.body;

	const response = await passwordResetService.createByUsername(username);
	res.send(response);
};

export const verifyCode = async (req: Request, res: Response) => {
	const passwordResetService = new PasswordResetService();

	const { id } = req.params;
	const { code, token } = req.body;

	const response = await passwordResetService.verifyCode(id, token, code);
	return res.send(response);
};