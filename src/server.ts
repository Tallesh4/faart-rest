/* eslint-disable no-mixed-spaces-and-tabs */
import "express-async-errors";
import express from "express";
import http from "http";
import https from "https";
import mongoose from "mongoose";
import cron from "node-cron";
import session from "express-session";
import BaseRoutes from "./base/base.routes";
import { ValidatorProvider } from "./base/providers/validator.provider";
import { BaseJob } from "./base/base.job";
import { AddressInfo } from "net";
import { default as connectMongodbSession } from "connect-mongodb-session";


class Server {
	app;
	server: https.Server | http.Server;
	port: any;
	host?: string;
	mongodbUri: string;
	providers = [ValidatorProvider];
	jobs: BaseJob[] = [
	];
	constructor(options: object = {}) {
		this.app = express();
		this.port = process.env.PORT || "4000";
		this.host = process.env.HOST;

		if (process.env.WORKER) {
			this.server = http.createServer(this.app);
		} else {
			this.server = https.createServer(options, this.app);
		}

		this.mongodbUri = (process.env.MONGODB_URL || "mongodb://127.0.0.1:27017") +
			"/" + (process.env.MONGODB_DATABASE || "undefined");

		if (process.env.MONGODB_USER && process.env.MONGODB_PASS && process.env.MONGODB_AUTH_SOURCE) {
			mongoose.connect(this.mongodbUri, {
				user: process.env.MONGODB_USER,
				pass: process.env.MONGODB_PASS,
				authSource: process.env.MONGODB_AUTH_SOURCE,
			}).then(() => {
				console.log("database connected on " + this.mongodbUri);
			});
		} else {
			mongoose.connect(this.mongodbUri).then(() => {
				console.log("database connected on " + this.mongodbUri);
			});
		}
	}

	async init() {
		for (const provider of this.providers) {
			await provider();
		}

		for (const job of this.jobs) {
			if (job.schedule) {
				cron.schedule(job.schedule, job.run);
			} else {
				await job.run();
			}
		}
		

		this.app.set("trust proxy", 1);

		const MongoDBStore = connectMongodbSession(session);

		const store: any = new MongoDBStore({
			uri: this.mongodbUri,
			collection: "sessions",
		});

		this.app.use(session({
			store: store,
			secret: "MyK3y",
			saveUninitialized: true,
			resave: true,
			cookie: { 
				sameSite: "lax",
				secure: false,
				httpOnly: true,
				maxAge: 3600000
			}
		}));

		this.app.use("/", BaseRoutes);

		if (this.host) {
			this.server.listen(this.port, this.host, () => {
				const address = <AddressInfo>this.server.address();
				console.log(`server started on ${address.address}:${address.port}`);
			});
		} else {
			this.server.listen(this.port, () => {
				const address = <AddressInfo>this.server.address();
				console.log(`server started on ${address.address}:${address.port}`);
			});
		}

		//await ExecuteAllJob();
	}
}

const server = new Server();

server.init();