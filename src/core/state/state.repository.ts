import BaseRepository from "../../base/base.repository";
import { StateInterface } from "./state.interface";
import StateModel from "./state.model";

export default class StateRepository extends BaseRepository<StateInterface> {
	constructor() {
		super(StateModel);
	}
}