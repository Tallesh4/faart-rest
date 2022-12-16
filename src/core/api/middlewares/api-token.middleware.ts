import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../../../base/utils/error.response.handler";

export default async function ApiTokenMiddleware(req: Request, res: Response, next: NextFunction) {
	const apiToken = req.headers["x-api-token"];

	if(apiToken === process.env.API_TOKEN) {
		next();
	} else {
		const error = new ErrorResponse("Bad Request", 400);
		throw error;
	}
}