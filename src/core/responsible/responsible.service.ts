import { ResponsibleInterface } from "./responsible.interface";
import BaseService from "../../base/base.service";
import ResponsibleRepository from "./responsible.repository";
import CreateResponsibleValidator from "./validators/create.responsible.validator";
import DeleteResponsibleValidator from "./validators/delete.responsible.validator";
import UpdateResponsibleValidator from "./validators/update.responsible.validator";
import AddressService from "../address/address.service";
import AssociationRepository from "../association/association.repository";

export default class ResponsibleService extends BaseService<ResponsibleInterface> {
	private addressService: AddressService;
	private associationRepository: AssociationRepository;
	constructor() {
		super(ResponsibleRepository, CreateResponsibleValidator, UpdateResponsibleValidator, DeleteResponsibleValidator);
		this.addressService = new AddressService();
		this.associationRepository = new AssociationRepository();

		this.repository.with("address", "address.city", "address.city.state", "associations");
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
			.with("address")
			.with("address.city")
			.with("address.city.state")
			.with("associations")
			.exec();

		if (items) {
			let dataList: any[] = [];
			for (let item of items) {
				const data = <any>await this.associationRepository.findById(item.associationId).exec();

				dataList.push({
					...item,
					associationName:data.entityName
				})
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
		}else{
			return {
				page,
				perPage,
				countPage,
				sortBy,
				sort,
				total,
				items
			};
		}

	}

	async create(props: any) {
		if (!props.addressId) {
			const address = await this.addressService.create(props);
			return super.create({ addressId: address?.id, ...props });
		} else {
			return super.create(props);
		}
	}



}