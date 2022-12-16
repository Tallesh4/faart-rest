import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../../../base/utils/error.response.handler";
import { UserInterface } from "../user.interface";

export const AllowedUsersMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const notAuthorizedError = new ErrorResponse("Not Authorized", 401);
    
	try {
		const user = <UserInterface> res.locals.user;

		if(user) {		
			next();
		} else {
			throw notAuthorizedError;
		} 
	} catch(error) {
		console.error(error);
		throw notAuthorizedError;
	}
};