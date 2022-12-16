import BaseValidator from "../../../base/base.validator";
import { AddressInterface } from "../address.interface";

export default class UpdateAddressValidator extends BaseValidator<AddressInterface> {
	constructor(data: AddressInterface) {
		super(data, {
			number: ["string"],
			street: ["string"],
			zipCode: ["string"],
			cityId: ["exists:city"],
			complement: ["string"],
			lat: ["numeric"],
			lng: ["numeric"],
		});
	}
}