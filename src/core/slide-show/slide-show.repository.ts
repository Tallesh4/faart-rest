import { SlideShowInterface } from "./slide-show.interface";
import BaseRepository from "../../base/base.repository";
import SlideShowModel from "./slide-show.model";

export default class SlideShowRepository extends BaseRepository<SlideShowInterface> {
	constructor() {
		super(SlideShowModel);
	}
}