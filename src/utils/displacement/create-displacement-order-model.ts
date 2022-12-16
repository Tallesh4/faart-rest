import Calendar from "../calendar";
import { DisplacementTypes } from "./displacement.interface";

export default function CreateDisplacementOrderModel (visit: DisplacementTypes, ref: string) {
	return {
		date: Calendar.getFormattedDate(new Date(visit.date)),
		visitDate: new Date(visit.date).getTime(),
		ref: ref,
		time: new Date(visit.date).getTime(),
		latlng: [visit.lat, visit.lng],
	};
}