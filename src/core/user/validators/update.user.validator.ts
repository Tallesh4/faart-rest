import BaseValidator from "../../../base/base.validator";
import { UserInterface } from "../user.interface";

export default class UpdateUserValidator extends BaseValidator<UserInterface> {
	constructor(data: UserInterface) {
		const userFolder = "user";
		const addressFolder = "address";
		const branchFolder = "branch";
		const hierarchyFolder = "hierarchy";

		super(data, {
			avatar: ["string"],
			cpf: ["string"],
			username: ["string", `uniqueUpdateRule:${userFolder}`],
			email: ["string"],
			name: ["string"],
			lastName: ["string"],
			contract: ["boolean"],
			registry: ["string"],
			phone: ["string"],
			addressId: [`exists:${addressFolder}`],
			branchIds: ["array", `exists:${branchFolder}`],
			hierarchyId: [`exists:${hierarchyFolder}`],
			protheusCode: [`uniqueUpdateRule:${userFolder},${data.id}`]
		});
	}
}