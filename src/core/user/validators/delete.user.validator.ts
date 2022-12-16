import BaseValidator from "../../../base/base.validator";
import { UserInterface } from "../user.interface";

export default class DeleteUserValidator extends BaseValidator<UserInterface> {
	constructor(data: UserInterface) {
		super(data, {
			id: ["required", "exists:user", "not_exists:group,userIds", "not_exists:clearance-order,userId", "block"] //TODO: Caso o usuário seja utilizado em algum lugar colocar aqui
		});
	}
}