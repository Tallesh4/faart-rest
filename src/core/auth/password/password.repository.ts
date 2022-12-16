import BaseRepository from "../../../base/base.repository";
import PasswordModel from "./password.model";
import { PasswordInterface } from "./password.interface";

export default class PasswordRepository extends BaseRepository<PasswordInterface> {
	constructor() {
		super(PasswordModel);

		this.relations["user"] = {
			lookup: {
				from: "users",
				localField: "userId",
				foreignField: "_id",
				as: "user"
			},
			justOne: true
		};
	}
}