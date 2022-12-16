import BaseValidator from "../../../base/base.validator";
import { RegistrationFormInterface } from "../registration-form.interface";

export default class DeleteRegistrationFormValidator extends BaseValidator<RegistrationFormInterface> {
	constructor(data: any) {
		super(data, {
			id: ["required", "exists:registrationFormValidator"],
		});
	}
}