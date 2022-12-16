import { id, parseId } from "../../base/base.repository";
import BaseService from "../../base/base.service";
import { AddressInterface } from "../address/address.interface";
import AddressService from "../address/address.service";
import ImageService from "../image/image.service";
import { UserInterface } from "./user.interface";
import UserRepository from "./user.repository";
import CreateUserValidator from "./validators/create.user.validator";
import DeleteUserValidator from "./validators/delete.user.validator";
import UpdateUserValidator from "./validators/update.user.validator";

export default class UserService extends BaseService<UserInterface> {
	addressService: AddressService;
	constructor() {
		super(UserRepository, CreateUserValidator, UpdateUserValidator, DeleteUserValidator);
		this.addressService = new AddressService();

		this.repository.with("address", "address.city", "address.city.state", "wallets", "relationships", "hierarchy", "wallets");
	}

	// async paginate(page: number, perPage: number, sortBy: string, sort: string, query?: Record<string, unknown>): Promise<any> {
	// 	const total = <number>await this.repository.count(query);
	// 	const countPage = Math.floor(total / perPage) + (total % perPage == 0 ? 0 : 1);

	// 	page = page <= countPage ? page : countPage;

	// 	if (!page) {
	// 		page = 1;
	// 	}

	// 	const sortQuery: Record<string, string> = {};
	// 	sortQuery[sortBy] = sort;

	// 	const items = await this.repository.find(query)
	// 		.sort(sortQuery)
	// 		.startAt((page - 1) * perPage)
	// 		.size(perPage)
	// 		.with("address")
	// 		.with("wallets")
	// 		.with("relationships")
	// 		.with("hierarchy")
	// 		.select({
	// 			address: "$address",
	// 			addressId:true,
	// 			appVersionId:true,
	// 			avatar:true,
	// 			branchIds:true,
	// 			cpf:true,
	// 			email:true,
	// 			hierarchy: "$hierarchy",
	// 			hierarchyId:true,
	// 			hiredAt:true,
	// 			name:true,
	// 			phone:true,
	// 			username:true,
	// 			status:true,
	// 			protheusCode:true,
	// 			registry:true,
	// 			protheusLocal:true,
	// 			relationships: "$relationships",
	// 			wallets: "$wallets",
	// 		})
	// 		.exec();

	// 	return {
	// 		page,
	// 		perPage,
	// 		countPage,
	// 		sortBy,
	// 		sort,
	// 		total,
	// 		items
	// 	};
	// }
	
	async getMe(userId: string) {
		return await this.repository.findById(userId).with("hierarchy").select({
			"hierarchy.name": true,
			"hierarchy.id": true,
			"hierarchy._id": true,
			"hierarchy.level": true,
			"name": true,
			"avatar": true,
			"protheusCode": true,
			"protheusLocal": true
		}).exec();
	}

	async create(props: UserInterface): Promise<UserInterface> {
		const address = await this.addressService.create(props);
		const data = await super.create({ addressId: address?.id, ...props });

		return <UserInterface>data;
	}

	async updateById(id: string | id | undefined, props: any): Promise<UserInterface | undefined> {
		const imageService = new ImageService();
		const user = <UserInterface>await this.repository.findById(id).exec();

		if (user) {
			if (props.state || props.city || props.street || props.number || props.complement || props.zipCode) {
				if (user.addressId) {
					await this.addressService.updateById(user.addressId, props);
				} else {
					const address = <AddressInterface>await this.addressService.create(props);
					if (address) {
						props.addressId = address.id;
					}
				}
			}
			if(props.avatarFile) {
				if(user.avatar) {
					const fileName = user.avatar.split("/").pop()?.split("?")[0];

					if(fileName) {
						try {
							await imageService.deleteFile(fileName, "users");
						}catch(error: unknown) {
							console.error(error);
						}
					}
				}
				props.avatar = await imageService.upload(props.avatarFile, user.id?.toString(), "users");
			}
		}
		
		return super.updateById(id, props);
	}

	async blockById(id: string | id | undefined, props: any): Promise<UserInterface | undefined> {
		console.log(props)
		const user = <UserInterface>await this.repository.findById(id).exec();
		
		return super.updateById(id, props);
	}

	async deleteById(id: string | id | undefined): Promise<UserInterface> {
		const userId = parseId(String(id));

		return <UserInterface>await this.archiveManyByQuery({ _id: userId });
	}

	async findById(id: string | id | undefined): Promise<UserInterface> {
		return <UserInterface>await this.repository
			.with("hierarchy")
			.findById(id)
			.exec();
	}


}