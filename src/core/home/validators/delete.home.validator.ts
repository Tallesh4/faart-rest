import BaseValidator from "../../../base/base.validator";
import { HomeInterface } from "../home.interface";

export default class DeleteHomeValidator extends BaseValidator<HomeInterface> {
	constructor(data: any) {
		super(data, {
			id: ["required", "exists:home"],
		});
	}
}