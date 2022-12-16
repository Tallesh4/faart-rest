
import BaseRepository from "../../base/base.repository";
import { AddressInterface } from "./address.interface";
import AddressModel from "./address.model";

export default class AddressRepository extends BaseRepository<AddressInterface> {
	constructor() {
		super(AddressModel);

		this.relations["city"] = {
			lookup: {
				from: "cities",
				localField: "cityId",
				foreignField: "_id",
				as: "city"
			},
			justOne: true
		};
	}
}