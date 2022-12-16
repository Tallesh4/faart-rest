import BaseRepository from "../../base/base.repository";
import { CountryInterface } from "./country.interface";
import CountryModel from "./country.model";

export default class CountryRepository extends BaseRepository<CountryInterface> {
	constructor() {
		super(CountryModel);
	}
}