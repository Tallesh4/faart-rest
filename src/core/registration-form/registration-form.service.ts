import { RegistrationFormInterface } from "./registration-form.interface";
import BaseService from "../../base/base.service";
import RegistrationFormRepository from "./registration-form.repository";
import CreateRegistrationFormValidator from "./validators/create.registration-form.validator";
import DeleteRegistrationFormValidator from "./validators/delete.registration-form.validator";
import UpdateRegistrationFormValidator from "./validators/update.registration-form.validator";
import AddressService from "../address/address.service";
import AddressRepository from "../address/address.repository";
import StateRepository from "../state/state.repository";

export default class RegistrationFormService extends BaseService<RegistrationFormInterface> {
	private addressService: AddressService;
	private addressRepository: AddressRepository;
	private stateRepository: StateRepository;
	constructor() {
		super(RegistrationFormRepository, CreateRegistrationFormValidator, UpdateRegistrationFormValidator, DeleteRegistrationFormValidator);
		this.addressService = new AddressService();
		this.addressRepository = new AddressRepository();
		this.stateRepository = new StateRepository();
	}

	async paginate(page: number, perPage: number, sortBy: string, sort: string, query?: Record<string, unknown>): Promise<any> {
		const total = <number>await this.repository.count(query);
		const countPage = Math.floor(total / perPage) + (total % perPage == 0 ? 0 : 1);

		page = page <= countPage ? page : countPage;

		if (!page) {
			page = 1;
		}

		const sortQuery: Record<string, string> = {};
		sortQuery[sortBy] = sort;

		const items = <any>await this.repository.find(query)
			.sort(sortQuery)
			.startAt((page - 1) * perPage)
			.size(perPage)
			.exec();

		if (items) {
			let dataList: any[] = [];

			for (let item of items) {
				if (item.addressResponsibleId !== null && item.addressAssociationId !== null) {
					const dataResponsible = <any>await this.addressRepository.findById(item.addressResponsibleId).with("city").exec()


					const stateResponsible = <any>await this.stateRepository.findById(dataResponsible.city.stateId).exec()
					let cityResponsible = {
						...dataResponsible.city,
						state: stateResponsible
					}

					delete dataResponsible.city

					const addressResponsible = {
						...dataResponsible,
						city: cityResponsible
					}

					const dataAssociation = <any>await this.addressRepository.findById(item.addressAssociationId).with("city").exec()

					const stateAssociation = <any>await this.stateRepository.findById(dataAssociation.city.stateId).exec()
					let cityAssociation = {
						...dataAssociation.city,
						state: stateAssociation
					}

					delete dataAssociation.city

					const addressAssociation = {
						...dataAssociation,
						city: cityAssociation
					}

					let itemFormatted = {
						...item,
						addressResponsible: addressResponsible,
						addressAssociation: addressAssociation,
					}

					dataList.push(itemFormatted)

				}else{
					dataList.push(item)
				}
			}

			return {
				page,
				perPage,
				countPage,
				sortBy,
				sort,
				total,
				items: dataList
			};

		}

	}


	async create(props: any) {
		if (!props.addressResponsibleId) {
			let dataResponsible = {
				street: props.streetResponsible,
				number: props.numberResponsible,
				state: props.stateResponsible,
				city: props.cityResponsible,
				zipCode: props.zipCodeResponsible,
				complement: props.complementResponsible,
			}

			const addressResponsible = await this.addressService.create(dataResponsible);

			let dataAssociation = {
				street: props.streetAssociation,
				number: props.numberAssociation,
				state: props.stateAssociation,
				city: props.cityAssociation,
				zipCode: props.zipCodeAssociation,
				complement: props.complementAssociation,
			}

			const addressAssociation = await this.addressService.create(dataAssociation);


			return super.create({ addressResponsibleId: addressResponsible?.id, addressAssociationId: addressAssociation?.id, ...props });
		} else {
			return super.create(props);
		}
	}
}