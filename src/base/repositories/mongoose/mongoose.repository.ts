import mongoose from "mongoose";
import { Model, Aggregate, PipelineStage } from "mongoose";
import { BaseRepositoryInterface, id, parseId } from "../../base.repository";

export default class MongooseRepository<T> implements BaseRepositoryInterface<T> {
	validateKey = "enabled";
	model: Model<T[] | T | undefined>;
	aggregate: Aggregate<T[] | T | undefined>;
	isFindOne: boolean;

	relations: Record<string, {
		lookup: {
			from: string
			as: string
			localField?: string
			foreignField?: string
			let?: Record<string, unknown>
			pipeline?: Exclude<PipelineStage, PipelineStage.Merge | PipelineStage.Out | PipelineStage.Search>[],
		},
		justOne?: boolean
	}>;
	query: Record<string, unknown>;

	locale: string = (process.env.LANGUAGE || "en_US").split("_")[0];
	constructor(model: Model<T[] | T | undefined>) {
		this.model = model;
		this.model.schema.virtual("id").get(function(this: {_id: mongoose.Types.ObjectId}) {
			return this._id;
		}).set(function(this: {_id: mongoose.Types.ObjectId}, value: mongoose.Types.ObjectId) {
			this._id = value;
		});
		
		this.isFindOne = false;
		this.relations = {};
		this.query = {};
		this.aggregate = this.model.aggregate();
	}
	init() {
		this.isFindOne = false;
		this.query = {};
		this.aggregate = this.model.aggregate();
	}
	all(query: Record<string, unknown> = {}): this {
		query = this.getFormattedQuery(query, false);
		this.aggregate = this.aggregate.match(query);
		return this;
	}
	find(query: Record<string, unknown> = {}): this {
		query = this.getFormattedQuery(query);
		this.aggregate = this.aggregate.match(query);
		return this;
	}
	first(query: Record<string, unknown> = {}): this {
		query = this.getFormattedQuery(query);
		this.aggregate = this.aggregate.match(query);
		this.size(1);
		this.isFindOne = true;
		return this;
	}
	findById(id: id | string | undefined): this {
		const query = this.getFormattedQuery({id});
		this.aggregate = this.aggregate.match(query);
		this.isFindOne = true;
		return this;
	}
	startAt(startAt = 0): this {
		this.aggregate = this.aggregate.skip(startAt);
		return this;
	}
	sort(sort = {}): this {
		this.aggregate = this.aggregate.collation({locale: this.locale});
		this.aggregate = this.aggregate.sort(sort);
		return this;
	}
	size(size: number): this {
		this.aggregate = this.aggregate.limit(size);
		return this;
	}

	async countAggregate(): Promise<number> {
		this.aggregate = this.aggregate.count("count");
		const result = <any[]> await this.exec();

		if(result &&  result.length) {
			return result[0].count ?? 0;
		}
		return 0;
	}

	async count(query: Record<string, unknown> = {}): Promise<number> {
		query = this.getFormattedQuery(query);
		return await this.model.find(query).countDocuments() ?? 0;
	}
	async firstOrCreate(props: Record<string, unknown>): Promise<T | undefined> {
		
		const first = await this.first(props).exec();
		if(first) {
			return <T> first;
		} else {
			return <T | undefined> await this.model.create(props);
		}
	}
	async create(props: T): Promise<T | undefined> {
		return <T | undefined> await this.model.create(props);
	}
	async insertMany(props: T[]): Promise<T[] | undefined> {
		return <T[] | undefined> await this.model.insertMany(props);
	}
	async updateById(id: id | string | undefined, props: any): Promise<T[] | T | undefined> {
		const query = this.getFormattedQuery({id}, false);
		return <T[] | T | undefined> await this.model.findOneAndUpdate(query, props);
	}
	async updateManyById(ids: id[] | string[] | undefined, props: any): Promise<unknown> {
		const query = this.getFormattedQuery({id: ids}, false);
		return await this.model.updateMany(query, props);
	}
	async deleteById(id: id | string | undefined): Promise<T[] | T | undefined> {
		const query = this.getFormattedQuery({id}, false);
		return <T[] | T | undefined> await this.model.findOneAndDelete(query);
	}
	async clear(): Promise<void> {
		await this.model.deleteMany({});
	}

	async deleteMany(query: Record<string, unknown> = {}): Promise<void>{
		if(Object.keys(query).length){
			await this.model.deleteMany(query);
		}
	}

	where(key: string, value: unknown): this {
		this.query[key] = value;
		return this;
	}
	with(...relations: Array<string>): this {
		relations.forEach(relationName => {
			const relation = this.relations[relationName];
			if(relation) {
				this.aggregate = this.aggregate.lookup(relation.lookup);
				if(relation.justOne) {
					this.aggregate = this.aggregate.unwind({path: "$" + relation.lookup.as, preserveNullAndEmptyArrays: true});
				}
			}
		});
		return this;
	}
	select(fields: Record<string, unknown>): this {
		const project: Record<string, unknown> = {};
		Object.entries(fields).forEach(([key, value]) => {
			
			project[key] = value ? (typeof value === "boolean" ? 1 : value) : 0;
		});
		if(Object.keys(project).length) {
			this.aggregate = this.aggregate.project(project);
		}
		return this;
	}
	unwind(unwind: string) {
		this.aggregate = this.aggregate.unwind(unwind);
		return this;
	}

	group(fields: Record<string, any>): this {
		const project: Record<string, any> = {};

		Object.entries(fields).forEach(([key, value]) => {
			project[key] = value;
		});

		if(Object.keys(project).length) {
			this.aggregate = this.aggregate.group(project);
		} 

		return this;
	}

	getAggregate() {
		return this.aggregate;
	}

	getFormattedQuery(query: Record<string, unknown> = {}, validateKey = true): Record<string, unknown> {
		if(this.validateKey && !Object.prototype.hasOwnProperty.call(query, this.validateKey) && validateKey) {
			query[this.validateKey] = true;
		}
		return this.formatQuery(Object.assign(query, this.query));
	}
	formatQuery(query: Record<string, any> = {}): Record<string, unknown> {
		if(Object.prototype.hasOwnProperty.call(query, "$or")) {
			query.$or = query.$or.map((q: Record<string, any>) => {
				if(Object.prototype.hasOwnProperty.call(q, "id")) {
					q._id = Array.isArray(q.id) ? q.id.map(ids => typeof ids == "string" ? parseId(ids) : ids) : (typeof q.id == "string" ? parseId(q.id) : q.id);
					delete q.id;
				}
				for(const key in q) {
					const value = q[key];

					if(typeof value == "undefined") {
						delete q[key];
						continue;
					}

					if(Array.isArray(value) && key.charAt(0) != "$") {
						q[key] = {$in: value};
					}

					if(typeof value == "object" && value != null) {
						if(Object.prototype.hasOwnProperty.call(value, "lt")) {
							q[key].$lt = q[key].lt;
							delete q[key].lt;
						}
			
						if(Object.prototype.hasOwnProperty.call(value, "lte")) {
							q[key].$lte = q[key].lte;
							delete q[key].lte;
						}
			
						if(Object.prototype.hasOwnProperty.call(value, "gte")) {
							q[key].$gte = q[key].gte;
							delete q[key].gte;
						}
			
						if(Object.prototype.hasOwnProperty.call(value, "gt")) {
							q[key].$gt = q[key].gt;
							delete q[key].gt;
						}
					}
				}

				return q;
			});
		} else {
			if(Object.prototype.hasOwnProperty.call(query, "id")) {
				query._id = Array.isArray(query.id) ? query.id.map(ids => typeof ids == "string" ? parseId(ids) : ids) : (typeof query.id == "string" ? parseId(query.id) : query.id);
				delete query.id;
			}
			for(const key in query) {
				const value = query[key];

				if(typeof value == "undefined") {
					delete query[key];
					continue;
				}

				if(Array.isArray(value) && key.charAt(0) != "$") {
					query[key] = {$in: value};
				}

				if(typeof value == "object" && value != null) {
					if(Object.prototype.hasOwnProperty.call(value, "lt")) {
						query[key].$lt = query[key].lt;
						delete query[key].lt;
					}
		
					if(Object.prototype.hasOwnProperty.call(value, "lte")) {
						query[key].$lte = query[key].lte;
						delete query[key].lte;
					}
		
					if(Object.prototype.hasOwnProperty.call(value, "gte")) {
						query[key].$gte = query[key].gte;
						delete query[key].gte;
					}
		
					if(Object.prototype.hasOwnProperty.call(value, "gt")) {
						query[key].$gt = query[key].gt;
						delete query[key].gt;
					}
				}
			}
		}
		return query;
	}

	async exec(): Promise<T[] | T | undefined> {
		let result =  <T[] | T | undefined> await this.aggregate.exec();
		if(result) {
			if(Array.isArray(result)) {
				const newResult: T[]= [];
				result.forEach(doc => {
					const item: any = doc;
					newResult.push({...<T> item, id: item._id});
				});
				if(this.isFindOne)  {
					const item: any = newResult[0];
					result = <T | undefined> item ? {...<T> item, id: item._id} : item;
				} else {
					result = newResult;
				}
			} else {
				const item: any = result;
				result = <T | undefined> {...<T> item, id: item._id};
			}
		}
		this.init();
		return result;
	}
}