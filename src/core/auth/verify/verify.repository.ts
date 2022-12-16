import BaseRepository from "../../../base/base.repository";
import { VerifyInterface } from "./verify.interface";
import VerifyModel from "./verify.model";

export default class VerifyRepository extends BaseRepository<VerifyInterface> {
	constructor() {
		super(VerifyModel);

		this.relations["password"] = {
			lookup: {
				from: "passwords",
				localField: "passwordId",
				foreignField: "_id",
				as: "password"
			},
			justOne: true
		};
	}
}