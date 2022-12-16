import { NextFunction, Request, Response } from "express";
import * as firebase from "firebase-admin";
import BaseService from "../../base/base.service";
import { ErrorResponse } from "../../base/utils/error.response.handler";
import { ImageInterface } from "./image.interface";
import ImageRepository from "./image.repository";
import CreateImageValidator from "./validators/create.image.validator";
import DeleteImageValidator from "./validators/delete.image.validator";
import UpdateImageValidator from "./validators/update.image.validator";

export default class ImageService  extends BaseService<ImageInterface>{
	constructor(){
		super(ImageRepository, CreateImageValidator, UpdateImageValidator, DeleteImageValidator);
	}

	async upload(file: Express.Multer.File, fileName?: string, path?: string){
		const storage = firebase.storage().bucket();
		const dateTime = new Date().getTime();

		const extension = file.originalname.split('.').pop();

		if(path){
			fileName = `${path}/${dateTime}.${fileName ? fileName + "." + extension : file.originalname}`;
		} else {
			fileName = `${dateTime}.${fileName ? fileName + "." + extension : file.originalname}`;
		}

		const fileStorage = storage.file(fileName);
		await fileStorage.save(file.buffer);
    
		const url = await fileStorage.getSignedUrl({
			action: "read",
			expires: "01-01-" + (+new Date().getFullYear() + 400)
		});
		
		return url.toString();
	}
    async deleteFile(fileName: string, path?: string) {
		const storage = firebase.storage().bucket();
        let file = await storage.file(path ? path + "/" + fileName : fileName);
        await file.delete();
        return true;
    }
	async getUrl(fileName?: string, path?: string) {
		const storage = firebase.storage().bucket();
		const fileStorage = storage.file(path + "/" + fileName);
		const url = await fileStorage.getSignedUrl({
			action: "read",
			expires: "01-01-" + (+new Date().getFullYear() + 400)
		});
		
		return url.toString();
	}
}