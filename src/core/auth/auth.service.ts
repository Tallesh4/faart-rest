import { ErrorResponse } from "../../base/utils/error.response.handler";
import PasswordRepository from "./password/password.repository";
import UserRepository from "../user/user.repository";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PasswordInterface } from "./password/password.interface";
import VerifyRepository from "./verify/verify.repository";
import { UserInterface } from "../user/user.interface";
import { VerifyInterface } from "./verify/verify.interface";
import EmailService from "../email/email.service";

export default class AuthService {
	passwordRepository: PasswordRepository;
	verifyRepository: VerifyRepository;
	userRepository: UserRepository;
	emailService: EmailService;
	constructor() {
		this.passwordRepository = new PasswordRepository();
		this.verifyRepository = new VerifyRepository();
		this.userRepository = new UserRepository();
		this.emailService = new EmailService();
	}

	async login(username: string, password: string) {
		const error = new ErrorResponse("username or password incorrect", 400);
		const user = <UserInterface>await this.userRepository.first({
			username: username || ""
		}).exec();

		if (user) {
			const storedPassword = <PasswordInterface>await this.passwordRepository.first({ userId: user.id }).exec();

			if (storedPassword) {
				const compare = await bcrypt.compare(password, storedPassword.hash);
				if (compare) {
					let verify = <VerifyInterface>await this.verifyRepository.first({ passwordId: storedPassword.id, expireAt: { $gt: new Date() } }).exec();

					if (verify) {
						verify = <VerifyInterface>await this.verifyRepository.create({ passwordId: storedPassword.id, userId: user.id });
						await this.emailService.sendCodeSecurityLoginEmail(user.email, String(verify.code), user.name);
						return { id: verify?.id, token: verify?.token, expireAt: verify?.expireAt };
					} else {
						verify = <VerifyInterface>await this.verifyRepository.create({ passwordId: storedPassword.id, userId: user.id });
						await this.emailService.sendCodeSecurityLoginEmail(user.email, String(verify.code), user.name);
						return { id: verify?.id, token: verify?.token, expireAt: verify?.expireAt };
					}
				} else {
					throw error;
				}
			} else {

				throw error;
			}
		} else {
			throw error;
		}
	}

	async refreshToken(accessToken: string, refreshToken: string): Promise<{ accessToken: string, refreshToken: string } | undefined> {
		const invalidRefreshTokenError = new ErrorResponse("Invalid refresh token", 401);
		try {
			const verifyRefreshToken = <{ accessToken: string }>jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || "REFRESH_TOKEN_SECRET");
			if (verifyRefreshToken && verifyRefreshToken.accessToken == accessToken) {
				const password = <PasswordInterface>await this.passwordRepository.first({
					refreshTokens: refreshToken
				}).exec();

				const newAccessToken = jwt.sign({ userId: password.userId }, process.env.ACCESS_TOKEN_SECRET || "ACCESS_TOKEN_SECRET", {
					expiresIn: process.env.ACCESS_TOKEN_DURATION || "10m"
				});
				const newRefreshToken = jwt.sign({ accessToken: newAccessToken }, process.env.REFRESH_TOKEN_SECRET || "REFRESH_TOKEN_SECRET", {
					expiresIn: process.env.REFRESH_TOKEN_DURATION || "7d"
				});

				await this.passwordRepository.updateById(password.id, { $pull: { refreshTokens: refreshToken } });
				await this.passwordRepository.updateById(password.id, { $push: { refreshTokens: newRefreshToken } });

				return { accessToken: newAccessToken, refreshToken: newRefreshToken };
			} else {
				throw invalidRefreshTokenError;
			}
		} catch (error) {
			throw invalidRefreshTokenError;
		}
	}

	async logout(refreshToken: string) {
		const password = <PasswordInterface>await this.passwordRepository.first({
			refreshTokens: refreshToken
		}).exec();

		if (password) {
			await this.passwordRepository.updateById(password.id, { $pull: { refreshTokens: refreshToken } });
			return true;
		}

		return false;
	}
}