import BaseRepository from "../../base/base.repository";
import { UserInterface } from "./user.interface";
import UserModel from "./user.model";

export default class UserRepository extends BaseRepository<UserInterface> {
	constructor() {
		super(UserModel);

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

		this.relations["hierarchy"] = {
			lookup: {
				from: "hierarchies",
				localField: "hierarchyId",
				foreignField: "_id",
				as: "hierarchy"
			},
			justOne: true
		};
	}
}