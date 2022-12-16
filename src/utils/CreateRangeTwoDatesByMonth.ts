export default function CreateRangeTwoDatesByMonth(months: number[]){
	const lastMonth = months[months.length-1];
	const rangeDays = [];

	for(const indexMonth in months){
		const monthNumber = months[indexMonth];

		const year = new Date().getUTCFullYear();

		for(let indexDay = 1; indexDay < 31; indexDay++){
			const date = new Date(`${year}-${monthNumber}-${indexDay}`);
            
			if(date.getUTCMonth()+1 <= lastMonth){
				rangeDays.push(date);
			}
		}
	}

	return {
		startDate: rangeDays[0],
		endDate: rangeDays[rangeDays.length-1]
	};
}