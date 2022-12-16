import BaseService from "../../base/base.service";
import { CityInterface } from "./city.interface";
import CityRepository from "./city.repository";

export default class CityService extends BaseService<CityInterface> {
	constructor() {
		super(CityRepository);
	}
}