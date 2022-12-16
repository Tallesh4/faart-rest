import { FederationInterface } from "./federation.interface";
import BaseRepository from "../../base/base.repository";
import FederationModel from "./federation.model";

export default class FederationRepository extends BaseRepository<FederationInterface> {
	constructor() {
		super(FederationModel);
	}
}