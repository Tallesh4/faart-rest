import BaseValidator from "../../../base/base.validator";
import { RegistrationFormInterface } from "../registration-form.interface";

export default class UpdateRegistrationFormValidator extends BaseValidator<RegistrationFormInterface> {
	constructor(data: any) {
		super(data, {
			name: ["unique:registrationFormValidator"],
		});
	}
}