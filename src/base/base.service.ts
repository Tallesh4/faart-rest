import { BaseInterface } from "./base.interface";
import { BaseRepositoryInterface, id } from "./base.repository";
import { PaginateInterface } from "./interfaces/paginate.interface";
import BaseValidator from "./base.validator";

export default class BaseService<Type> {
	repository: BaseRepositoryInterface<Type>;
	createValidator: (new (data: any) => BaseValidator<any>) | undefined;
	updateValidator: (new (data: any) => BaseValidator<any>) | undefined;
	deleteValidator: (new (data: any) => BaseValidator<any>) | undefined;
	constructor(
		repository: new () => BaseRepositoryInterface<Type>,
		createValidator: (new (data: any) => BaseValidator<any>) | undefined = undefined,
		updateValidator: (new (data: any) => BaseValidator<any>) | undefined = undefined,
		deleteValidator: (new (data: any) => BaseValidator<any>) | undefined = undefined,
	) {
		this.repository = new repository();
		this.createValidator = createValidator;
		this.updateValidator = updateValidator;
		this.deleteValidator = deleteValidator;
	}
	async getAll(enabled = true): Promise<Array<Type>> {
		if (enabled) {
			return <Type[]>await this.repository.find().exec();
		} else {
			return <Type[]>await this.repository.all().exec();
		}
	}
	async findById(id: id | string | undefined): Promise<Type | Type[]> {
		return <Type>await this.repository.findById(id).exec();
	}
	async paginate(page = 1, perPage = 10, sortBy = "createdAt", sort = "desc", query?: Record<string, unknown>, local?: string): Promise<PaginateInterface<Type>> {
		const total = <number>await this.repository.count(query);
		const countPage = Math.floor(total / perPage) + (total % perPage == 0 ? 0 : 1);

		page = page <= countPage ? page : countPage;

		if (!page) {
			page = 1;
		}

		const sortQuery: Record<string, string> = {};
		sortQuery[sortBy] = sort;

		const items = <Type[]>await this.repository.find(query)
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
	async search(query?: Record<string, unknown>): Promise<Type[]> {
		return <Type[]>await this.repository.find(query).exec();
	}
	async first(query?: Record<string, unknown>): Promise<Type> {
		return <Type>await this.repository.first(query).exec();
	}
	async create(props: Type): Promise<Type | undefined> {
		if (this.createValidator) {
			const createValidator = new this.createValidator(props);
			if (await createValidator.checkFails()) {
				throw createValidator.getError();
			}

			return <Type>await this.repository.create(props);
		} else {
			return undefined;
		}
	}
	async updateById(id: id | string | undefined, props: any): Promise<Type | undefined> {
		if (this.updateValidator) {
			const updateValidator = new this.updateValidator({ id, ...props });
			if (await updateValidator.checkFails()) {
				throw updateValidator.getError();
			}

			await this.repository.updateById(id, props);

			return <Type>await this.repository.findById(id).exec();
		} else {
			return undefined;
		}
	}
	async archiveById(id: id | string | undefined) {
		return await this.repository.updateById(id, { enabled: false });
	}

	async insertMany(props: Type[]) {
		return await this.repository.insertMany(props);
	}

	async archiveManyById(ids: id[] | string[] | undefined, enabled: boolean) {
		return await this.repository.updateManyById(ids, { enabled });
	}

	async archiveManyByQuery(query: Record<string, unknown> = {}) {
		const listIds: id[] = [];

		const data: any = await this.repository.find(query).exec();

		if (data?.length) {
			data?.forEach((item: BaseInterface) => {
				if (item.id) {
					listIds.push(item.id);
				}
			});
		}

		return await this.repository.updateManyById(listIds, { enabled: false });
	}

	async find(query?: Record<string, unknown>) {
		return this.repository.find(query).exec();
	}

	async deleteById(id: id | string | undefined): Promise<Type | undefined> {
		if (this.deleteValidator) {
			const deleteValidator = new this.deleteValidator({ id });
			if (await deleteValidator.checkFails()) {
				throw deleteValidator.getError();
			}

			return <Type>await this.repository.deleteById(id);
		} else {
			return undefined;
		}
	}

	setCreateValidator(createValidator: (new (data: any) => BaseValidator<any>) | undefined = undefined) {
		this.createValidator = createValidator;

		return this;
	}
	setUpdateValidator(updateValidator: (new (data: any) => BaseValidator<any>) | undefined = undefined) {
		this.updateValidator = updateValidator;

		return this;
	}
	setDeleteValidator(deleteValidator: (new (data: any) => BaseValidator<any>) | undefined = undefined) {
		this.deleteValidator = deleteValidator;

		return this;
	}
}