import { parseId } from "../base/base.repository";
import Calendar from "./calendar";

export default (query: Record<string, any>) => {
    const queries: Record<string, any> = {...query};
	const splitUsers = query && query.userId ? queries.userId.split(","): undefined;
	const splitClients = query && query.clientId ? queries.clientId.split(","): undefined;

    if(query){
		if(query.startDate){
			queries.startDate = new Date(new Date(queries.startDate).setUTCHours(0, 0, 0, 0));
		} else {
			queries.startDate = Calendar.getInstance(new Date().getTime()).toISOString().slice(0, 10);
		}

		queries.endDate = queries.endDate ? new Date(new Date(queries.endDate).setUTCHours(23, 59, 59, 59)) : new Date()
		
		if(splitUsers){
			queries.userId = splitUsers.map((id: string) => {
				if(id && id.length){
					return parseId(id)
				}
			})
		} else {
			queries.userId = undefined;
		}

		if(splitClients){
			queries.clientId = splitClients.map((id: string) => {
				if(id && id.length){
					return parseId(id)
				}
			})
		} else {
			queries.clientId = undefined;
		}
	}

    return queries;
}