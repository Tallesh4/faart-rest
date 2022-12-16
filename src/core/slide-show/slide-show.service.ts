import { SlideShowInterface } from "./slide-show.interface";
import BaseService from "../../base/base.service";
import SlideShowRepository from "./slide-show.repository";
import CreateSlideShowValidator from "./validators/create.slide-show.validator";
import DeleteSlideShowValidator from "./validators/delete.slide-show.validator";
import UpdateSlideShowValidator from "./validators/update.slide-show.validator";

export default class SlideShowService extends BaseService<SlideShowInterface> {
	constructor() {
		super(SlideShowRepository, CreateSlideShowValidator, UpdateSlideShowValidator, DeleteSlideShowValidator);
	}
}