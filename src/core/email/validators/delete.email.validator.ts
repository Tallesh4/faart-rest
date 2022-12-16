import BaseValidator from "../../../base/base.validator";
import { EmailInterface } from "../email.interface";

export default class DeleteEmailValidator extends BaseValidator<EmailInterface> {
	constructor(data: EmailInterface) {
		super(data, {
			id: ["required", "exists:email"],
		});
	}
}