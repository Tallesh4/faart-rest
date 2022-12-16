import BaseValidator from "../../../base/base.validator";
import { FederationInterface } from "../federation.interface";

export default class CreateFederationValidator extends BaseValidator<FederationInterface> {
	constructor(data: any) {
		super(data, {
			
		});
	}
}