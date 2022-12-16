import BaseValidator from "../../../base/base.validator";
import { HomeInterface } from "../home.interface";

export default class UpdateHomeValidator extends BaseValidator<HomeInterface> {
	constructor(data: any) {
		super(data, {
			name: ["unique:home"],
		});
	}
}