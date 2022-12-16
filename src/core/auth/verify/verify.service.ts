import BaseService from "../../../base/base.service";
import { ErrorResponse } from "../../../base/utils/error.response.handler";
import { VerifyInterface } from "./verify.interface";
import VerifyRepository from "./verify.repository";

import jwt from "jsonwebtoken";
import PasswordRepository from "../password/password.repository";
import { PaginateInterface } from "../../../base/interfaces/paginate.interface";
import UserService from "../../user/user.service";

export default class VerifyService extends BaseService<VerifyInterface> {
	passwordRepository: PasswordRepository;
	userService: UserService;
	constructor() {
		super(VerifyRepository);

		this.passwordRepository = new PasswordRepository();
		this.userService = new UserService();
	}

	async paginate(page: number, perPage: number, sortBy: string, sort: string, query?: Record<string, unknown> | undefined): Promise<PaginateInterface<VerifyInterface>> {
		const total = <number> await this.repository.count(query);
		const countPage = Math.floor(total / perPage) + (total % perPage == 0 ? 0 : 1);

		page = page <= countPage ? page : countPage;

		if(!page) {
			page = 1;
		}

		const sortQuery: Record<string, string> = {};
		sortQuery[sortBy] = sort;

		const items = <VerifyInterface[]> await this.repository
			.find(query)
			.select({
				remainingAttempts: true,
				userId: true,
				code: true,
				createdAt: true,
				expireAt: { $dateToString: { date: "$expireAt", format: "%d/%m/%Y %H:%M" } },
			})
			.sort({ createdAt: -1 })
			.startAt((page - 1) * perPage)
			.size(perPage)
			.exec();

		// Verify is in another Database;
		for(let item of items){
			if(item.userId){
				const user = await this.userService.first({ _id: item.userId });

				if(user){
					item.user = user;
				} else {
					item.user = {
						name: "Usuário não encontrado",
						email: "Email não encontrado",
						username: "Usuário não encontrado",
					}
				}
			}

			if(!item.userId){
				item.user = {
					name: "Usuário não encontrado",
					email: "Email não encontrado",
					username: "Usuário não encontrado",
				}
			}
		}

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

	async verifyCode(id: string, token: string | undefined, code: string | undefined) {
		const verify = <VerifyInterface> await this.repository.findById(id).with("password").exec();

		if(verify && verify.password) {
			if(verify.code == code && verify.token == token) {
				if(verify.expireAt ? verify.expireAt.getTime() > new Date().getTime() : false) {

					const accessToken = jwt.sign({userId: verify.password.userId}, process.env.ACCESS_TOKEN_SECRET || "ACCESS_TOKEN_SECRET", {
						expiresIn: process.env.ACCESS_TOKEN_DURATION || "10m"
					});
					const refreshToken = jwt.sign({accessToken}, process.env.REFRESH_TOKEN_SECRET || "REFRESH_TOKEN_SECRET", {
						expiresIn: process.env.REFRESH_TOKEN_DURATION || "7d"
					});
	
					await this.repository.updateById(verify.id, {enabled: false});
					await this.passwordRepository.updateById(verify.passwordId, {$push: {refreshTokens: refreshToken}});
	
					return {accessToken, refreshToken};
				} else {
					const error = new ErrorResponse("verify expired", 403);
					throw error;
				}
			} else {
				const remainingAttempts = verify.remainingAttempts ? verify.remainingAttempts - 1 : 0;

				if(remainingAttempts){
					await this.repository.updateById(verify.id, { remainingAttempts });
				} else {
					await this.repository.updateById(verify.id, { remainingAttempts, enabled: false });
				}
				
				const error = new ErrorResponse("token or code invalid", 400);
				throw error;
			}
		} else {
			const error = new ErrorResponse("id invalid", 400);
			throw error;
		}
	}
}