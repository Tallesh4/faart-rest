import BaseRepository from "../../../base/base.repository";
import PasswordResetModel from "./password-reset.model";
import { PasswordResetInterface } from "./password-reset.interface";

export default class PasswordResetRepository extends BaseRepository<PasswordResetInterface> {
	constructor() {
		super(PasswordResetModel);

		this.relations["password"] = {
			lookup: {
				from: "passwords",
				localField: "passwordId",
				foreignField: "_id",
				as: "password",
			},
			justOne: true
		};
	}
}