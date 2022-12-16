import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import BaseService from "../../../base/base.service";
import { ErrorResponse } from "../../../base/utils/error.response.handler";
import { PasswordInterface } from "../password/password.interface";
import PasswordRepository from "../password/password.repository";
import { UserInterface } from "../../user/user.interface";
import UserRepository from "../../user/user.repository";
import { PasswordResetInterface } from "./password-reset.interface";
import PasswordResetRepository from "./password-reset.repository";
import EmailService from "../../email/email.service";
import { id } from "../../../base/base.repository";
import { VerifyInterface } from "../verify/verify.interface";

export default class PasswordResetService extends BaseService<PasswordResetInterface> {
	userRepository: UserRepository;
	passwordRepository: PasswordRepository;
	emailService: EmailService;
	constructor() {
		super(PasswordResetRepository);

		this.passwordRepository = new PasswordRepository();
		this.userRepository = new UserRepository();
		this.emailService = new EmailService();
	}

	async createByUsername(username: string): Promise<{userEmail: string, token?: string, expireAt?: Date, id?: id}> {
		const user = <UserInterface> await this.userRepository.first({
			username: username || ""
		}).exec();

		if(user) {
			let password = <PasswordInterface> await this.passwordRepository.first({userId: user.id}).exec();
    
			if(!password) {
				password = <PasswordInterface> await this.passwordRepository.create({
					hash: "",
					userId: user.id
				});
			}
			
			let passwordReset: PasswordResetInterface = <PasswordResetInterface> await this.repository.first({
				passwordId: password.id,
				expireAt: {$gte: new Date()}
			}).exec();

			if(!passwordReset) {
				passwordReset = <PasswordResetInterface> await this.repository.create({
					passwordId: password.id
				});
			}

			let hiddenUserEmail = user.email.slice(0, 3);
			for (let i = 0; i < (user.email.split("@")[0].length - 3); i++) {
				hiddenUserEmail += "*";
			}
			hiddenUserEmail += user.email.split("@")[1];
			console.log(passwordReset.token)
			await this.emailService.sendCodeResetLogin(user.email, passwordReset.id, passwordReset.token, String(passwordReset.code), user.name);
			return { 
				id: passwordReset.id,
				token: passwordReset.token, 
				expireAt: passwordReset.expireAt,
				userEmail: hiddenUserEmail, 
			};
		} else {
			const error = new ErrorResponse("user not found", 400);
			error.errors = {username: ["Usuário não encontrado"]};
			throw error;
		}
	}

	async resetPassword(id: string, token: string, code: string, newPassword: string): Promise<{accessToken: string, refreshToken: string}> {
		const passwordReset = <PasswordResetInterface> await this.repository.first({
			id,
			token, 
			code
		}).with("password").exec();
		const expiredTokenAndIdError = new ErrorResponse("Expired token or invalid id", 400);

		if(passwordReset) {
			await this.repository.updateById(passwordReset.id, {enabled: false});
			const expireAt = <Date>passwordReset.expireAt;
			if(expireAt.getTime() > new Date().getTime()) {
				const salt = await bcrypt.genSalt(10);
				const hash = await bcrypt.hash(newPassword, salt);

				const password = <PasswordInterface> await this.passwordRepository.updateById(passwordReset.passwordId, {
					hash
				});

				const accessToken = jwt.sign({userId: password.userId}, process.env.ACCESS_TOKEN_SECRET || "ACCESS_TOKEN_SECRET", {
					expiresIn: process.env.ACCESS_TOKEN_DURATION || "10m"
				});
				const refreshToken = jwt.sign({accessToken}, process.env.REFRESH_TOKEN_SECRET || "REFRESH_TOKEN_SECRET", {
					expiresIn: process.env.REFRESH_TOKEN_DURATION || "7d"
				});

				await this.passwordRepository.updateById(password.id, {$set: {refreshTokens: []}});
				await this.passwordRepository.updateById(password.id, {$push: {refreshTokens: refreshToken}});

				return {accessToken, refreshToken};
			} else {
				throw expiredTokenAndIdError;
			}
		} else {
			throw expiredTokenAndIdError;
		}
	}

	async verifyCode(id: string, token?: string | undefined, code?: string | undefined){
		const verify = <VerifyInterface> await this.repository.findById(id).exec();

		if(verify && verify.passwordId){
			if(verify.token === token && verify.code === code){
				if(verify.expireAt ? verify.expireAt.getTime() > new Date().getTime(): false){
					return true;
				} else {
					const error = new ErrorResponse("expired");
					throw error;
				}
			} else {
				const error = new ErrorResponse("token or code invalid", 400);
				throw error;
			}
		} else {
			const error = new ErrorResponse("id invalid", 400);
			throw error;
		}
	}
}