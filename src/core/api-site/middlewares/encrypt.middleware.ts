import { NextFunction, Request, Response } from "express";
import crypto from "crypto-js";

export default async function EncryptMiddleware(req: Request, res: Response, next: NextFunction) {
	const originalSend = res.send;
    
	res.send = (body: any) => {
		const encryptedBody = crypto.AES.encrypt(JSON.stringify(body), process.env.ENCRYPT_SECRET || "");
		body = encryptedBody.toString();
		return originalSend.bind(res)(body);
	};

	next();
}