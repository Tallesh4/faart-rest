import { Request, Response } from "express";
import { ErrorResponse } from "../../base/utils/error.response.handler";
import ImageService from "./image.service";

export const upload = async (req: Request, res: Response) => {
    if(!req.file){
        throw new ErrorResponse("file not found", 400);
    }
	
	const imageService = new ImageService();

    const path = req.body && req.body.bucket ? req.body.bucket : undefined;

	const image = await imageService.upload(req.file, undefined, path);
	
	return res.send({ image });
};

