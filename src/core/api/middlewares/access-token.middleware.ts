import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../../../base/utils/error.response.handler";
import { UserInterface } from "../../user/user.interface";
import UserService from "../../user/user.service";
import jwt from "jsonwebtoken";
import { id, parseId } from "../../../base/base.repository";



export default async function AccessTokenMiddleware(req: Request, res: Response, next: NextFunction) {
	const userService = new UserService();

	const notAuthorizedError = new ErrorResponse("Not Authorized", 401);
	const accessToken = req.headers.authorization?.split(" ")[1];

	if(accessToken) {
		try {
			const accessPayload = <{userId: id}> await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET || "ACCESS_TOKEN_SECRET");

			const user = <UserInterface> await userService.findById(accessPayload.userId);

			if(user) {
				res.locals["user"] = user;
				res.locals["accessToken"] = accessToken;
				req.session!.allowedUsers = [];
				
				next();
			} else {
				throw notAuthorizedError;
			}
		} catch(error) {
			throw notAuthorizedError;
		}
		
	} else {
		throw notAuthorizedError;
	}
}