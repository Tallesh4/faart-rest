import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../../../base/utils/error.response.handler";

export default async function ApiSiteTokenMiddleware(req: Request, res: Response, next: NextFunction) {
	const apiToken = req.headers["x-site-token"];

	if(apiToken === process.env.SITE_TOKEN) {
		next();
	} else {
		const error = new ErrorResponse("Bad Request", 400);
		throw error;
	}
}