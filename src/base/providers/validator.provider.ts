import validator from "validatorjs";

export const ValidatorProvider = async () => {
	try {
		let language = process.env.LANGUAGE;
		let localMessages = {};
		if(language) {
			const localFile = await import(`../languages/${language}`);
			localMessages = localFile.default;
		} else {
			language = validator.getDefaultLang();
		}
		const defaultMessages = validator.getMessages(language);
		const messages = Object.assign(defaultMessages, localMessages);
        
		if(messages) {
			validator.setMessages(language, messages);
			validator.useLang(language);
		} else {
			validator.useLang(validator.getDefaultLang());
		}
	} catch(error) {
		console.log(error);
		validator.useLang(validator.getDefaultLang());
	}
};