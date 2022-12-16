import BaseService from "../../base/base.service";
import { StateInterface } from "./state.interface";
import StateRepository from "./state.repository";

export default class StateService extends BaseService<StateInterface> {
	constructor() {
		super(StateRepository);
	}
}