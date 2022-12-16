import { Request, Response } from "express";
import { ErrorResponse } from "../../base/utils/error.response.handler";
import AuthService from "./auth.service";

export const login = async (req: Request, res: Response) => {

	const authService = new AuthService();

	const {username, password} = req.body;

	const verify = await authService.login(username, password);
	res.send(verify);
};

export const token = async (req: Request, res: Response) => {
	const authService = new AuthService();

	const accessToken = req.headers.authorization?.split(" ")[1];
	const {refreshToken} = req.body;

	if(accessToken && refreshToken) {
		const tokens = await authService.refreshToken(accessToken, refreshToken);
		
		res.send(tokens);
	} else {
		const notAuthorizedError = new ErrorResponse("Not Authorized", 401);
		throw notAuthorizedError;
	}
};

export const logout = async (req: Request, res: Response) => {
	const authService = new AuthService();

	const {refreshToken} = req.body;

	const isOffline = await authService.logout(refreshToken);

	res.send({isOffline});
};