import { NextFunction, Request, Response } from "express";
import * as firebase from "firebase-admin";

firebase.initializeApp({
	credential: firebase.credential.cert({
		projectId: process.env.FIREBASE_STORAGE_PROJECT_ID,
		clientEmail: process.env.FIREBASE_STORAGE_CLIENT_EMAIL,
		privateKey: process.env.FIREBASE_STORAGE_PRIVATE_KEY
	}),
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET_URL,
});

const bucket = firebase.storage().bucket();

const uploadImage = (req: Request, res: Response, next: NextFunction) => {
	if(!req.file){
		return next();
	}

	const bucketName = req.body.bucket;
	const imageFile = req.file;
	const fileName = bucketName ? `${bucketName}/${new Date().getTime()}.${imageFile.originalname}` : `${new Date().getTime()}.${imageFile.originalname}`;
	const file = bucket.file(fileName);

	const stream = file.createWriteStream({
		metadata: {
			contentType: imageFile.mimetype,
		}
	});

	stream.on("error", (error) => {
		console.log(error);
	});

	stream.on("finish", async () => {       
		const url = await file.getSignedUrl({
			action: "read",
			expires: "01-01-" + (+new Date().getFullYear() + 400)
		});
		
		res.locals["image"] = url;
		next();
	});

	stream.end(req.file.buffer);
};


export default uploadImage;