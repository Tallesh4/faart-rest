export const DefaultSchema = {
	enabled: {
		type: Boolean,
		default: true,
	},
	status: {
		type: Number,
		default: 1,
	},
};

export const DefaultSchemaOptions = {
	timestamps: true,
	toJSON: {
		virtuals: true
	},
	toObject: {
		virtuals: true
	},
	versionKey: false,
	autoIndex: true,
};