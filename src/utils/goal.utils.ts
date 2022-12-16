import { ClientGoalInterface } from "../core/client-goal/client-goal.interface";
import { OrderItemInterface } from "../core/order-item/order-item.interface";



export interface GoalSuggestionsInterface {
    name: string,
    type: string,
    _id?: string,
    id?: string
}


export interface MonthValuesInterface {
    totalValue: number,
    totalSoldAmount: number,
    total: number
}


export interface GoalSettingsInterface {
    _id?: string,
    id?: string,
    clientId?: string,
    suggestTypeId: string,
    goalSuggestion?: GoalSuggestionsInterface,
    suggestName?: string,
    suggestValue?: number,
    seasonality: number,
    type?: "global" | "by_client" | "by_product"
    goal: number
}

export class GoalUtils {

    monthValues: MonthValuesInterface[] = [];

    constructor(monthValues: MonthValuesInterface[]) {
        this.monthValues = monthValues;
    }

    getTotal = (): number => {

        let total = 0;
        for (let item of this.monthValues) {
            total += item.totalValue;
        }

        return total;

    }

    getValueByType = (suggestionType: string, targetValue: "totalValue" | "totalSoldAmount" | "total" = "total"): number => {


        let newMonthValues: MonthValuesInterface[] = JSON.parse(JSON.stringify(this.monthValues));

        newMonthValues.sort((a, b) => {
            return b.totalValue - a.totalValue
        })

        let value = 0;

        switch (suggestionType) {
            case "higher":
                value = newMonthValues[0][targetValue];
                break;
            case "lower":
                value = newMonthValues[newMonthValues.length - 1][targetValue];
                break;
            case "average":
                value = this.getTotal() / 3;
                break;
        }

        return Number(parseFloat(String(value)).toFixed(2));

    }

    updateMeta = (suggestValue: number, seasonality: number) => {

        let goal = suggestValue ? suggestValue : 0;
        let average = seasonality && seasonality > 0 ? seasonality / 100 : 0;

        goal += (
            seasonality && seasonality > 0
                ?
                goal * average
                :
                0
        )

        return goal;

    }

    getMeta = (suggestValue: number, seasonality: number) => {
        let goal = this.updateMeta(suggestValue, seasonality);
        return Number(parseFloat(String(goal)).toFixed(2))
    }
}

const getMonthValues = (item: any) => {
    let monthValues: MonthValuesInterface[] = [
        {
            totalValue: item.orders.month1.totalValue,
            totalSoldAmount: item.orders.month1.soldAmount || item.orders.month1.totalSoldAmount,
            total: item.orders.month1.total
        },
        {
            totalValue: item.orders.month2.totalValue,
            totalSoldAmount: item.orders.month2.soldAmount || item.orders.month2.totalSoldAmount,
            total: item.orders.month2.total
        },
        {
            totalValue: item.orders.month3.totalValue,
            totalSoldAmount: item.orders.month3.soldAmount || item.orders.month3.totalSoldAmount,
            total: item.orders.month3.total
        }
    ];
    return monthValues;
}

export const getGoalCalc = (item: any, goalSettings: ClientGoalInterface) => {

    let seasonality = goalSettings.seasonality;
    let suggestionType = goalSettings.goalSuggestion?.type;

    if (seasonality && suggestionType) {

        let monthValues = getMonthValues(item);

        const goalUtils = new GoalUtils(monthValues);

        let suggestValue = goalUtils.getValueByType(suggestionType);

        let goal = goalUtils.getMeta(suggestValue, seasonality);

        return goal;
    }
}

export const getAdvancedGoalCalc = (item: any, goalSettings: ClientGoalInterface) => {

    let seasonality = goalSettings.seasonality;
    let suggestionType = goalSettings.goalSuggestion?.type;

    if (seasonality && suggestionType) {

        let monthValues = getMonthValues(item);

        const goalUtils = new GoalUtils(monthValues);

        let suggestTotalSoldAmount = goalUtils.getValueByType(suggestionType, "totalSoldAmount");
        let suggestTotalValue = goalUtils.getValueByType(suggestionType, "totalValue");
        let suggestTotal = goalUtils.getValueByType(suggestionType, "total");

        let inVolume = {
            suggest: suggestTotalSoldAmount || 0,
            goal: goalUtils.getMeta(suggestTotalSoldAmount, seasonality) || 0
        };
        let inBilling = {
            suggest: suggestTotalValue || 0,
            goal: goalUtils.getMeta(suggestTotalValue, seasonality) || 0
        };
        let inTotal = {
            suggest: suggestTotal || 0,
            goal: goalUtils.getMeta(suggestTotal, seasonality) || 0
        }

        return {
            inVolume,
            inBilling,
            inTotal
        };
    }
}