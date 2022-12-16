import BaseValidator from "../../../base/base.validator";
import { AssociationInterface } from "../association.interface";

export default class DeleteAssociationValidator extends BaseValidator<AssociationInterface> {
	constructor(data: any) {
		super(data, {
		});
	}
}