import BaseValidator from "../../../base/base.validator";
import { AssociationInterface } from "../association.interface";

export default class CreateAssociationValidator extends BaseValidator<AssociationInterface> {
	constructor(data: any) {
		super(data, {
		});
	}
}