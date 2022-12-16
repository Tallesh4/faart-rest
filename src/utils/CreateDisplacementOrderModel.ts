import Calendar from "./Calendar";

interface DisplacementVisit {
    date: string | Date,
    lat: number, 
    long: number
}

export default function CreateDisplacementOrderModel (visit: DisplacementVisit, ref: string) {
	return {
		date: Calendar.getFormattedDate(new Date(visit.date)),
		visitDate: new Date(visit.date).getTime(),
		ref: ref,
		time: new Date(visit.date).getTime(),
		latLong: [visit.lat, visit.long],
	};
}