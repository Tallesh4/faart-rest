import BaseRepository from "../../base/base.repository";
import { EmailInterface } from "./email.interface";
import EmailModel from "./email.model";

export default class EmailRepository extends BaseRepository<EmailInterface> {
	constructor() {
		super(EmailModel);
	}
}