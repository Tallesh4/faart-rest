import { NextFunction, Request, Response } from "express";
import * as crypto from "crypto-js";
import { ErrorResponse } from "../../../base/utils/error.response.handler";
import getRawBody from "raw-body";

export default async function DecryptMiddleware(req: Request, res: Response, next: NextFunction) {
	const hash = await getRawBody(req, {encoding: "utf-8"});
	if(hash) {
		try {
			const decryptedData = crypto.AES.decrypt(hash.toString(), process.env.DECRYPT_SECRET || "");
			const data = decryptedData.toString(crypto.enc.Utf8);

			req.body = data != "" ? JSON.parse(data) : {};
			next();
		} catch(err) {
			console.log(err);
			const error = new ErrorResponse("Bad Request", 400);
			throw error;
		}
	} else {
		next();
	}
	
}