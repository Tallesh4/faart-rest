import { ResponsibleInterface } from "./responsible.interface";
import BaseRepository from "../../base/base.repository";
import ResponsibleModel from "./responsible.model";

export default class ResponsibleRepository extends BaseRepository<ResponsibleInterface> {
	constructor() {
		super(ResponsibleModel);

		this.relations["address"] = {
			lookup: {
				from: "addresses",
				localField: "addressId",
				foreignField: "_id",
				as: "address"
			},
			justOne: true
		};

		this.relations["address.city"] = {
			lookup: {
				from: "cities",
				localField: "address.cityId",
				foreignField: "_id",
				as: "address.city"
			},
			justOne: true
		};

		this.relations["address.city.state"] = {
			lookup: {
				from: "states",
				localField: "address.city.stateId",
				foreignField: "_id",
				as: "address.city.state"
			},
			justOne: true
		};

		this.relations["association"] = {
			lookup: {
				from: "associations",
				localField: "associationId",
				foreignField: "_id",
				as: "association"
			},
			justOne: true
		};
	}
}