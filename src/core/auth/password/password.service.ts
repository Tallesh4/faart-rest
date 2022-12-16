import BaseService from "../../../base/base.service";
import { PasswordInterface } from "./password.interface";
import PasswordRepository from "./password.repository";

export default class PasswordService extends BaseService<PasswordInterface> {
	constructor() {
		super(PasswordRepository);
	}
}