import Validator, { ErrorMessages, Rules } from "validatorjs";
import { BaseRepositoryInterface, parseId } from "./base.repository";
import { ErrorResponse } from "./utils/error.response.handler";

export default class BaseValidator<T> extends Validator<T> {
	constructor(data: T, rules: Rules, customMessages: ErrorMessages = {}) {
		super(data, rules, customMessages);

		BaseValidator.registerAsync("unique", this.uniqueRule, <string>BaseValidator.getMessages(super.lang).unique);
		BaseValidator.registerAsync("update", this.uniqueUpdateRule, <string>BaseValidator.getMessages(super.lang).unique);
		BaseValidator.registerAsync("exists", this.existsRule, <string>BaseValidator.getMessages(super.lang).exists);
		BaseValidator.registerAsync("not_exists", this.notExistsRule, <string>BaseValidator.getMessages(super.lang).not_exists);
		BaseValidator.registerAsync("block", this.blockRule, <string>BaseValidator.getMessages(super.lang).block);
		BaseValidator.registerAsync("integer", this.integer, <string>BaseValidator.getMessages(super.lang).integer);
		BaseValidator.registerAsync("limitNumber", this.limitNumber, <string>BaseValidator.getMessages(super.lang).limitNumber);
		BaseValidator.registerAsync("lessThan", this.lessThan, <string>BaseValidator.getMessages(super.lang).lessThan);
		BaseValidator.registerAsync("force_shipping_product_error", this.forceShippingProductError, <string>BaseValidator.getMessages(super.lang).shippingNotExistProduct);
	}

	getError(): ErrorResponse {
		const error = new ErrorResponse(this.constructor.name);
		error.errors = this.errors.all();
		error.status = 400;

		return error;
	}

	uniqueRule = async function (value: string | number | boolean, args: string, attribute: string, passes: (success?: boolean, message?: string) => void) {
		const params = args.split(",");
		if (params.length >= 1) {
			const repositoryName = params[0];
			const queryKey = params[1] || attribute;

			try {
				const { default: Repository } = await import(`../core/${repositoryName}/${repositoryName}.repository`);
				const repository: BaseRepositoryInterface<any> = new Repository();
				 
				const query: Record<string, unknown> = {};
				query[queryKey] = { $regex: new RegExp(`\\b(${value})\\b`, "i") };
				query["enabled"] = true;

				const items = await repository.all(query).exec();

				return passes(!items.length);
			} catch (error) {
				console.error(error);
				return passes(false);
			}
		}

		return passes(false);
	};

	existsRule = async function (value: string | number | boolean, args: string, attribute: string, passes: (success?: boolean, message?: string) => void) {
		const params = args.split(",");
		if (params.length >= 1) {
			const repositoryName = params[0];
			const foreignKey = params[1] || "id";
			const typeValue = params[2];

			try {
				const { default: Repository } = await import(`../core/${repositoryName}/${repositoryName}.repository`);
				const repository = new Repository();

				const query: Record<string, unknown> = {};
				if (typeValue !== "string") {
					query[foreignKey] = Array.isArray(value) ? value.map(v => parseId(v)) : parseId(<string>value);
				} else {
					query[foreignKey] = Array.isArray(value) ? value.map(v => v) : <string>value;
				}

				const items = await repository.all(query).exec();
				return passes(items.length == (Array.isArray(value) ? value.length : 1));
			} catch (error) {
				console.error(error);
				return passes(false);
			}
		}

		return passes(false);
	};

	notExistsRule = async function (value: string | number | boolean, args: string, attribute: string, passes: (success?: boolean, message?: string) => void) {
		const params = args.split(",");
		if (params.length == 2) {
			const repositoryName = params[0];
			const foreignKey = params[1];

			try {
				const { default: Repository } = await import(`../core/${repositoryName}/${repositoryName}.repository`);
				const repository = new Repository();

				const query: Record<string, unknown> = {};
				query[foreignKey] = parseId(<string>value);
				const items = await repository.all(query).exec();

				return passes(!items.length);
			} catch (error) {
				console.error(error);
				return passes(false);
			}
		}

		return passes(false);
	};

	blockRule = async function (value: string | number | boolean, args: string, attribute: string, passes: (success?: boolean, message?: string) => void) {
		return passes(false);
	};

	uniqueUpdateRule = async function (value: string | number | boolean, args: string, attribute: string, passes: (success?: boolean, message?: string) => void) {
		const params = args.split(",");

		if (params.length >= 1) {
			const repositoryName = params[0];
			const _id = params[1];
			const queryKey = params[3] || attribute;

			try {
				const { default: Repository } = await import(`../core/${repositoryName}/${repositoryName}.repository`);
				const repository = new Repository();

				const query: Record<string, unknown> = {};
				query[queryKey] = value; //{$regex: new RegExp(`\\b(${value})\\b`, "i")};
				query["_id"] = { $not: { $eq: parseId(_id) } };
				query["enabled"] = true;

				const items = await repository.all(query).exec();

				return passes(!items.length);
			} catch (error) {
				console.error(error);
				return passes(false);
			}
		}

		return passes(false);
	};

	integer = async function (value: string | number | boolean, args: string, attribute: string, passes: (success?: boolean, message?: string) => void) {
		if (!Number.isInteger(value)) {
			return passes(false);
		}

		return passes(true);
	};

	limitNumber = async function (input: string | number | boolean, definedLimit: string, attribute: string, passes: (success?: boolean, message?: string) => void) {
		if (input > definedLimit) {
			return passes(false);
		}

		return passes(true);
	};

	lessThan = async function (input: string | number | boolean, less: string, attribute: string, passes: (success?: boolean, message?: string) => void) {
		if (input <= parseInt(less)) {
			return passes(false);
		}

		return passes(true);
	};

	forceShippingProductError = async function (value: string | number | boolean, args: string, attribute: string, passes: (success?: boolean, message?: string) => void) {
		console.log("value", value)
		return passes(false);
	};

	async checkFails() {
		const promise = new Promise(resolve => {
			this.checkAsync(() => {
				resolve(false);
			}, () => {
				resolve(true);
			});
		});
		return promise;
	}
}