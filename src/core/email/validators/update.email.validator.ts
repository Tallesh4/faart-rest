import BaseValidator from "../../../base/base.validator";
import { EmailInterface } from "../email.interface";

export default class UpdateEmailValidator extends BaseValidator<EmailInterface> {
	constructor(data: EmailInterface) {
		super(data, {
			name: ["unique:email"],
		});
	}
}