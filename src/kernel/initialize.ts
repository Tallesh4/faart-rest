import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { HierarchyInterface } from "../core/hierarchy/hierarchy.interface";
import HierarchyRepository from "../core/hierarchy/hierarchy.repository";
import { PasswordInterface } from "../core/auth/password/password.interface";
import PasswordRepository from "../core/auth/password/password.repository";
import { UserInterface } from "../core/user/user.interface";
import UserRepository from "../core/user/user.repository";

async function initialize() {
	const mongodbUri = (process.env.MONGODB_URL || "mongodb://127.0.0.1:27017") + 
        "/" + (process.env.MONGODB_DATABASE || "main");
    
	if(process.env.MONGODB_USER && process.env.MONGODB_PASS && process.env.MONGODB_AUTH_SOURCE) {
		await mongoose.connect(mongodbUri, {
			user: process.env.MONGODB_USER,
			pass: process.env.MONGODB_PASS,
			authSource: process.env.MONGODB_AUTH_SOURCE
		}).then(() => {
			console.log("database connected on " + mongodbUri);
		});
	} else {
		await mongoose.connect(mongodbUri).then(() => {
			console.log("database connected on " + mongodbUri);
		});
	}

	const userRepository = new UserRepository();
	const hierarchyRepository = new HierarchyRepository();
	const passwordRepository = new PasswordRepository();

	const hierarchy = <HierarchyInterface> await hierarchyRepository.create({
		tag: "admin",
		name: "Admin",
		level: -1
	});

	console.log("hierarchy created: " + hierarchy.id);

	const user = <UserInterface> await userRepository.create({
		username: "admin",
		name: "Administrator",
		email: "mac.artic4@gmail.com",
		hierarchyId: hierarchy.id,
	});

	console.log("user created: " + user.id);

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash("12345678", salt);

	const accessToken = jwt.sign({userId: user.id}, process.env.ACCESS_TOKEN_SECRET || "ACCESS_TOKEN_SECRET", {
		expiresIn: process.env.ACCESS_TOKEN_DURATION || "10m"
	});
	const refreshToken = jwt.sign({accessToken}, process.env.REFRESH_TOKEN_SECRET || "REFRESH_TOKEN_SECRET", {
		expiresIn: process.env.REFRESH_TOKEN_DURATION || "7d"
	});

	const password = <PasswordInterface> await passwordRepository.create({
		userId: user.id,
		hash,
		refreshTokens: [refreshToken]
	});

	console.log("password created: " + password.id);

	console.log({accessToken, refreshToken});

	process.exit();
}

initialize();