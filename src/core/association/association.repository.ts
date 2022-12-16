import { AssociationInterface } from "./association.interface";
import BaseRepository from "../../base/base.repository";
import AssociationModel from "./association.model";

export default class AssociationRepository extends BaseRepository<AssociationInterface> {
	constructor() {
		super(AssociationModel);

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

		this.relations["federation"] = {
			lookup: {
				from: "federations",
				localField: "federationId",
				foreignField: "_id",
				as: "federation"
			},
			justOne: true
		};
		
	}
}