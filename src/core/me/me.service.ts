import { id } from "../../base/base.repository";
import UserRepository from "../user/user.repository";
import Calendar from "../../utils/calendar";


export default class MeService {
	userRepository: UserRepository;

	
	constructor() {
		this.userRepository = new UserRepository();
	}

	async getMyProfile(userId: id | undefined) {
		const data = await this.userRepository.findById(userId).with("address", "address.city", "address.city.state", "hierarchy").exec();

		return data;
	}
}