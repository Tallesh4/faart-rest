import { NextFunction, Request, Response } from "express";

export class ErrorResponse extends Error {
	code: number | undefined;
	status: number | undefined;
	errors: Record<string, unknown> | undefined;
	constructor(message: string, code?: number, status?: number) {
		super(message);
		this.code = code;
		this.status = status ?? code;
	}
}

export const ErrorResponseHandler = (error: ErrorResponse | Error, req: Request, res: Response, next: NextFunction) => {
	if(error) {
		console.error(error);
		if(error instanceof ErrorResponse) {
			res.status(error.status || 500).json({
				message: error.message || "Server Error",
				code: error.code || error.status || 0,
				errors: error.errors,
			});
		} else {
			res.status(500).json({
				message: error.message || "Server Error",
				code: 0,
			});
		}
	} else {
		next();
	}
};