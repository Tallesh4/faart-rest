import { FederationInterface } from "./federation.interface";
import BaseService from "../../base/base.service";
import FederationRepository from "./federation.repository";
import CreateFederationValidator from "./validators/create.federation.validator";
import DeleteFederationValidator from "./validators/delete.federation.validator";
import UpdateFederationValidator from "./validators/update.federation.validator";

export default class FederationService extends BaseService<FederationInterface> {
	constructor() {
		super(FederationRepository, CreateFederationValidator, UpdateFederationValidator, DeleteFederationValidator);
	}
}