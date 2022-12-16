import BaseValidator from "../../../base/base.validator";
import { FederationInterface } from "../federation.interface";

export default class DeleteFederationValidator extends BaseValidator<FederationInterface> {
	constructor(data: any) {
		super(data, {
			id: ["required", "exists:federationValidator"],
		});
	}
}