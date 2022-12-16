import { parseId } from "../base/base.repository";

export const QueriesResolve = (query: any) => {

	const queries: Record<string, unknown> = {
		enabled: (<string>query.enabled) == "false" ? false : true,
	};

	for (let key in query) {

		if(query[key].includes("$ObjectId")){
			queries[key] = parseId(query[key].split(":")[1].toString());

		}else{
			queries[key] = query[key];

		}
	}

    return queries;
}