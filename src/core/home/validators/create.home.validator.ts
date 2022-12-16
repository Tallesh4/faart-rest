import BaseValidator from "../../../base/base.validator";
import { HomeInterface } from "../home.interface";

export default class CreateHomeValidator extends BaseValidator<HomeInterface> {
	constructor(data: any) {
		super(data, {
			name: ["required", "unique:home"],
		});
	}
}