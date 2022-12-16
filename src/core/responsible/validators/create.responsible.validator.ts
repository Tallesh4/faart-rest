import BaseValidator from "../../../base/base.validator";
import { ResponsibleInterface } from "../responsible.interface";

export default class CreateResponsibleValidator extends BaseValidator<ResponsibleInterface> {
	constructor(data: any) {
		super(data, {
		});
	}
}