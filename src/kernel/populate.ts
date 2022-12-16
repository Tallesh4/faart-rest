import mongoose from "mongoose";

const args = process.argv.slice(2);

async function main() {
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

	for(const arg of args) {
		try {
			const {default: populateFunction} = await import("../populate/" + arg + ".populate.ts");
			await populateFunction();
		} catch(error: unknown) {
			console.error(error);
		}
	}

	process.exit();
}


main();