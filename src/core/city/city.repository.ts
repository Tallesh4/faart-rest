import BaseRepository from "../../base/base.repository";
import { CityInterface } from "./city.interface";
import CityModel from "./city.model";

export default class CityRepository extends BaseRepository<CityInterface> {
	constructor() {
		super(CityModel);
	}
}