import { BaseInterface } from "../../base/base.interface";
import { id } from "../../base/base.repository";

export interface HomeInterface extends BaseInterface {
    visitsMade: number,
    expectedVisits: number,
    offRouteVisit: number,
    orderNumber: number,
    orderBilling: number
}

export interface HomeDailyIndicators extends HomeInterface{
    activeUsers: number,
    totalUsers: number,
    productivityByPercentage: string,
}

export interface HomeMonthlyIndicators{
    visitMade: number,
    offRouteVisit: number,
    percentageVisited: string,
    displacement: string,
    timeOfPDV: string,
    expectedVisits: number,
    journey: string,
    orderNumber: number,
    orderBilling: number
}
