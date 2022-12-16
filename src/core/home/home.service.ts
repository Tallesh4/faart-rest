import { id, parseId } from "../../base/base.repository";
import {
	HomeDailyIndicators,
	HomeInterface,
	HomeMonthlyIndicators,
} from "./home.interface";
import BaseService from "../../base/base.service";
import Calendar from "../../utils/calendar";
import CreateDisplacementOrderModel from "../../utils/displacement/create-displacement-order-model";
import GetDisplacementDisplayValue from "../../utils/displacement/get-displacement-display-value";
import UserService from "../user/user.service";
import HomeRepository from "./home.repository";
import CreateHomeValidator from "./validators/create.home.validator";
import DeleteHomeValidator from "./validators/delete.home.validator";
import UpdateHomeValidator from "./validators/update.home.validator";
import UserRepository from "../user/user.repository";
import RegistrationFormRepository from "../registration-form/registration-form.repository";
import AssociationRepository from "../association/association.repository";
import ResponsibleRepository from "../responsible/responsible.repository";


export default class HomeService extends BaseService<HomeInterface> {
	private userService: UserService;
	private userRepository: UserRepository;
	private registrationFormRepository: RegistrationFormRepository;
	private responsibleRepository: ResponsibleRepository;
	private associationRepository: AssociationRepository;

	constructor() {
		super(HomeRepository, CreateHomeValidator, UpdateHomeValidator, DeleteHomeValidator);
		this.userService = new UserService();
		this.userRepository = new UserRepository();
		this.registrationFormRepository = new RegistrationFormRepository();
		this.responsibleRepository = new ResponsibleRepository();
		this.associationRepository = new AssociationRepository();
		this.userService = new UserService();
	}

	async dailyIndicators(listUsers: id[]) {
		const rangeDays = Calendar.getDateBeginAndEndDay();

		const queries = {
			createdAt: { $gte: rangeDays.startDate, $lte: rangeDays.endDate },
		};

		const forms = <any>await this.registrationFormRepository.find(queries).exec()
		const user = <any>await this.userRepository.find().exec()

		if (forms && user) {
			let dailyIndicators: any = {
				users: user.length,
				forms: forms.length,
			}
			return dailyIndicators
		} else {
			let mouthIndicators: any = {
				association: 0,
				responsible: 0,
			}

			return mouthIndicators
		}
	}

	async monthlyIndicators(listUsers: id[]) {
		const rangeDays = Calendar.getDateBeginAndEndMonth(new Date().getUTCMonth() + 1, new Date().getUTCFullYear());

		const queries = {
			createdAt: { $gte: rangeDays.startDate, $lte: rangeDays.endDate },
		};

		const responsible = <any>await this.responsibleRepository.find(queries).exec()
		const association = <any>await this.associationRepository.find().exec()

		if (association && responsible) {
			let mouthIndicators: any = {
				association: association.length,
				responsible: responsible.length,
			}
			return mouthIndicators
		} else {
			let mouthIndicators: any = {
				association: 0,
				responsible: 0,
			}

			return mouthIndicators
		}
	}
}