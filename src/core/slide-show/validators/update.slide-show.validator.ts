import BaseValidator from "../../../base/base.validator";
import { SlideShowInterface } from "../slide-show.interface";

export default class UpdateSlideShowValidator extends BaseValidator<SlideShowInterface> {
	constructor(data: any) {
		super(data, {
			name: ["unique:slideShowValidator"],
		});
	}
}