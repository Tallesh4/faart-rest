import BaseValidator from "../../../base/base.validator";
import { SlideShowInterface } from "../slide-show.interface";

export default class CreateSlideShowValidator extends BaseValidator<SlideShowInterface> {
	constructor(data: any) {
		super(data, {
			name: ["required", "unique:slideShowValidator"],
		});
	}
}