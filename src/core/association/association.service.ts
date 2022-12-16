import { AssociationInterface } from "./association.interface";
import BaseService from "../../base/base.service";
import AssociationRepository from "./association.repository";
import CreateAssociationValidator from "./validators/create.association.validator";
import DeleteAssociationValidator from "./validators/delete.association.validator";
import UpdateAssociationValidator from "./validators/update.association.validator";
import AddressService from "../address/address.service";

export default class AssociationService extends BaseService<AssociationInterface> {
	private addressService: AddressService;
	constructor() {
		super(AssociationRepository, CreateAssociationValidator, UpdateAssociationValidator, DeleteAssociationValidator);
		this.addressService = new AddressService();
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
			.exec();


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

	async create(props: any) {
		if (!props.addressId) {
			const address = await this.addressService.create(props);
			return super.create({ addressId: address?.id, ...props });
		} else {
			return super.create(props);
		}
	}
}