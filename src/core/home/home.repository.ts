import BaseRepository from "../../base/base.repository";
import { HomeInterface } from "./home.interface";
import HomeModel from "./home.model";

export default class HomeRepository extends BaseRepository<HomeInterface> {
	constructor() {
		super(HomeModel);
	}
}