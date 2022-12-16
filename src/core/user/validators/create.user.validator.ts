import BaseValidator from "../../../base/base.validator";
import { UserInterface } from "../user.interface";

export default class CreateUserValidator extends BaseValidator<UserInterface> {
	constructor(data: UserInterface) {
		const userFolder = "user";
		const addressFolder = "address";
		const branchFolder = "branch";
		const hierarchyFolder = "hierarchy";

		super(data, {
			avatar: ["string"],
			cpf: ["string"],
			username: ["required", "string", `unique:${userFolder}`],
			email: ["required", "string"],
			name: ["required", "string"],
			lastName: ["string"],
			contract: ["boolean"],
			registry: ["string"],
			phone: ["string"],
			addressId: [`exists:${addressFolder}`],
			branchIds: ["array", `exists:${branchFolder}`],
			hierarchyId: ["required", `exists:${hierarchyFolder}`],
			protheusCode: ["required", `unique:${userFolder}`]
		});
	}
}