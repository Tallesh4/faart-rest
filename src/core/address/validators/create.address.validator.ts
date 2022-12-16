import BaseValidator from "../../../base/base.validator";
import { AddressInterface } from "../address.interface";

export default class CreateAddressValidator extends BaseValidator<AddressInterface> {
	constructor(data: AddressInterface) {
		super(data, {
			number: ["required", "string"],
			street: ["required", "string"],
			zipCode: ["required", "string"],
			cityId: ["required", "exists:city"],
			complement: ["string"],
			lat: ["numeric"],
			lng: ["numeric"],
		});
	}
}