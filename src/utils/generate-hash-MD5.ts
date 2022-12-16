import crypto from "crypto";

export function GenerateHashVisitMD5(clientId: string, userId: string){
	const date = new Date();
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	return crypto.createHash("md5").update(`${clientId}-${userId}-${year}-${month}-${day}`).digest("hex");
}