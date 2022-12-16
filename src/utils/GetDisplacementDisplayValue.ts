import CalculateDisplacement from "./CalculateDisplacement";
import Calendar from "./Calendar";

export default {
	displacementTimeDay: (displacementList: any[]) => {
		const response = {
			totalPdvTime: 0,
			totalDisplacement: 0,
			totalTimeDisplacement: 0,
			totalJourney: 0
		};

		for (const index in displacementList) {
			const displacement = displacementList[index];

			if (displacement) {
				const totalCheckouts = displacement.totalCheckOuts;

				const userTotalTime = displacement.timeOfClient.checkOutStamp - displacement.timeOfClient.checkInStamp;
				const timeInPdvMedia = userTotalTime / totalCheckouts;

				const journeyData = CalculateDisplacement.calculateAllDisplacementDay(displacement.displacementCalc);
				const displacementKmMedia = journeyData.displacement_km / totalCheckouts;
				const journeyTimeMedia = journeyData.journey_time;
				const displacementMedia = journeyData.displacement_time;

				if (timeInPdvMedia) {
					response.totalPdvTime += timeInPdvMedia;
				}

				if (displacementMedia) {
					response.totalTimeDisplacement += displacementMedia;
				}

				if (displacementKmMedia) {
					response.totalDisplacement += displacementKmMedia;
				}

				if (journeyTimeMedia) {
					response.totalJourney += (journeyTimeMedia);
				}
			}
		}

		response.totalDisplacement = (response.totalDisplacement / displacementList.length);
		response.totalTimeDisplacement = (response.totalTimeDisplacement / displacementList.length);
		response.totalPdvTime = (response.totalPdvTime / displacementList.length);
		response.totalJourney = (response.totalJourney / displacementList.length);

		return response;
	}
};
