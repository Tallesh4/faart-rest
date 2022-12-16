import { id } from "../../base/base.repository";
import BaseService from "../../base/base.service";
import { PaginateInterface } from "../../base/interfaces/paginate.interface";
import { HierarchyInterface } from "./hierarchy.interface";
import HierarchyRepository from "./hierarchy.repository";
import CreateHierarchyValidator from "./validators/create.hierarchy.validator";
import DeleteHierarchyValidator from "./validators/delete.hierarchy.validator";
import UpdateHierarchyValidator from "./validators/update.hierarchy.validator";

export default class HierarchyService extends BaseService<HierarchyInterface> {
	constructor() {
		super(HierarchyRepository, CreateHierarchyValidator, UpdateHierarchyValidator, DeleteHierarchyValidator);
	}
	async findByIdWithPermissions(id: id | string | undefined): Promise<HierarchyInterface> {
		return <HierarchyInterface> await this.repository.findById(id).with("permissions").exec();
	}

	async paginate(page = 1, perPage = 10, sortBy = "createdAt", sort = "desc", query?: Record<string, unknown>): Promise<PaginateInterface<HierarchyInterface>> {
		const total = <number> await this.repository.count(query);
		const countPage = Math.floor(total / perPage) + (total % perPage == 0 ? 0 : 1);

		page = page <= countPage ? page : countPage;

		if(!page) {
			page = 1;
		}

		const sortQuery: Record<string, string> = {};
		sortQuery[sortBy] = sort;

		const items = <HierarchyInterface[]> await this.repository
			.find(query)
			.with("users")
			.sort(sortQuery)
			.startAt((page - 1) * perPage)
			.size(perPage)
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

	async search(query?: Record<string, unknown>): Promise<HierarchyInterface[]> {
		return <HierarchyInterface[]> 
			await this.repository
				.find(query)
				.with("users")
				.exec();
	}

	async find(query?: Record<string, unknown>): Promise<HierarchyInterface | HierarchyInterface[] | undefined> {
		return await this.repository.find(query).with("users").exec();
	}
}