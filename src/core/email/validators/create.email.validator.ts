import BaseValidator from "../../../base/base.validator";
import { EmailInterface } from "../email.interface";

export default class CreateEmailValidator extends BaseValidator<EmailInterface> {
	constructor(data: EmailInterface) {
		super(data, {
			name: ["required", "unique:email"],
		});
	}
}