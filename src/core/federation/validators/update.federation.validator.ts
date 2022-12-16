import BaseValidator from "../../../base/base.validator";
import { FederationInterface } from "../federation.interface";

export default class UpdateFederationValidator extends BaseValidator<FederationInterface> {
	constructor(data: any) {
		super(data, {
			name: ["unique:federationValidator"],
		});
	}
}