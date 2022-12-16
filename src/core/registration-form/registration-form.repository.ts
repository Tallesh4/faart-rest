import { RegistrationFormInterface } from "./registration-form.interface";
import BaseRepository from "../../base/base.repository";
import RegistrationFormModel from "./registration-form.model";

export default class RegistrationFormRepository extends BaseRepository<RegistrationFormInterface> {
	constructor() {
		super(RegistrationFormModel);

		this.relations["address"] = {
			lookup: {
				from: "addresses",
				localField: "addressResponsibleId",
				foreignField: "_id",
				as: "address"
			},
			justOne: true
		};
		
		this.relations["address"] = {
			lookup: {
				from: "addresses",
				localField: "addressAssociationId",
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
	}

}