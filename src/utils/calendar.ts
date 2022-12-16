/* eslint-disable */

import GetZero from "./get-zero";
export const weekNames: string[] = ["Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado", "Domingo"];

export default {
    getDate: function (millis = new Date().getTime()) {
        return new Date(millis);
    },
    getWeekOfMonth: function () {

        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        function daysInMonth() {
            return 32 - new Date(currentMonth, currentYear, 32).getDate();
        }

        function getWeek(table: any) {

            let week = 0;

            let current_day = new Date().getDate();

            for (let week_index in table) {

                let week_days = table[week_index];

                for (let day_index in week_days) {

                    let day_in_week = week_days[day_index];

                    if (day_in_week == current_day) {
                        week = Number(week_index);
                        break;
                    }
                }
            }

            return week + 1;
        }

        let c_date = new Date();
        c_date.setDate(0);

        let firstDay = c_date.getDay() + 1;

        let table = [];

        let date = 1;
        for (let week_index = 0; week_index < 6; week_index++) {
            // creates a table row
            let row = [];

            //creating individual cells, filing them up with data.
            for (let day_index = 0; day_index < 7; day_index++) {

                if (week_index === 0 && day_index < firstDay) {

                    const cell = 0;
                    row.push(cell);

                } else if (date > daysInMonth()) {
                    break;
                } else {

                    const cell = date;
                    row.push(cell);
                    date++;

                }


            }

            table.push(row); // appending each row into calendar body.
        }


        return getWeek(table);

    },
    getDayOfWeek: function () {
        switch (this.getDate().getDay()) {
            case 0:
                return "sunday";
            case 1:
                return "monday";
            case 2:
                return "tuesday";
            case 3:
                return "wednesday";
            case 4:
                return "thursday";
            case 5:
                return "friday";
            case 6:
                return "saturday";
        }
    },
    getDayOfWeekFromDate: function (date: Date) {
        switch (date.getDay()) {
            case 0:
                return "sunday";
            case 1:
                return "monday";
            case 2:
                return "tuesday";
            case 3:
                return "wednesday";
            case 4:
                return "thursday";
            case 5:
                return "friday";
            case 6:
                return "saturday";
        }
    },
    getFormattedDate: function (date: Date) {
        return `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}/${(date.getMonth() + 1) < 10 ? `0${(date.getMonth() + 1)}` : (date.getMonth() + 1)}/${date.getFullYear()}`;
    },
    getFormattedDateReverse: function (date: Date) {
        return `${date.getFullYear()}/${(date.getMonth() + 1) < 10 ? `0${(date.getMonth() + 1)}` : (date.getMonth() + 1)}/${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
    },
    getFormattedTime: function (date: Date) {
        var h = GetZero(date.getHours());
        var m = GetZero(date.getMinutes());
        var s = GetZero(date.getSeconds());

        return `${h}:${m}:${s}`;
    },
    getFormattedDateAndTime: function (date: Date) {
        return `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}/${(date.getMonth() + 1) < 10 ? `0${(date.getMonth() + 1)}` : (date.getMonth() + 1)}/${date.getFullYear()} ${date.getHours() < 10 ?
            `0${date.getHours()}` : date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}:${date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()}`;
    },
    getSimpleFormattedDateAndTime: function (date: Date) {
        return `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}${(date.getMonth() + 1) < 10 ? `0${(date.getMonth() + 1)}` : (date.getMonth() + 1)}${date.getFullYear()}${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;
    },
    getDisplayTime: function (time: number) {
        if (time > 0) {
            var time_seconds = Math.floor((time / 1000) % 60);
            var time_minutes = Math.floor((time / 1000 / 60) % 60);
            var time_hours = Math.floor(time / 1000 / 60 / 60);

            var time_days = Math.floor(time_hours / 24);

            var days: any = time_days > 0 ? `${time_days} dias e ` : "";

            return `${days}${GetZero(time_hours - (24 * days))}:${GetZero(time_minutes)}:${GetZero(time_seconds)}`;
        }

        return `00:00:00`;
    },
    compareTimes(time1: number, time2: number) {
        return Math.abs(time1 - time2);
    },
    compareDays(time1: number, time2: number) {
        // To calculate the time difference of two dates
        var difference_in_time = this.compareTimes(time1, time2);

        // To calculate the no. of days between two dates
        var difference_in_days = difference_in_time / (1000 * 3600 * 24);

        return difference_in_days;
    },
    createRangeDates(from: Date, to: Date, min_date = 0) {
        var from_date = from;//Iniciar na data de hoje
        var to_date = to//Finalizar na data de hoje
        var current_range = new Date(to_date.getTime());

        var range_months: any = [];
        var range_dates = [];

        //Precisamos criar o range baseado no filtro passado pela requisição
        while (current_range > from_date) {

            if (current_range.getDate() > min_date) {
                range_dates.push({
                    o_stamp: this.getFormattedDate(current_range),//Original stamp normal
                    stamp: this.getFormattedDateReverse(current_range),//Reverse stamp
                    day_of_week: current_range.getDay(),
                    time_stamp: current_range.getTime()
                })

                var month = (current_range.getMonth() + 1) < 10 ? `0${current_range.getMonth() + 1}` : current_range.getMonth() + 1;

                if (!range_months.includes(month)) {
                    range_months.push(month);
                }
            }

            current_range.setDate(current_range.getDate() - 1);


        }

        //Adicionar o ultimo range faltando na lista.
        if (current_range.getDate() >= from_date.getDate()) {
            range_dates.push({
                o_stamp: this.getFormattedDate(current_range),//Original stamp normal
                stamp: this.getFormattedDateReverse(current_range),//Reverse stamp
                day_of_week: current_range.getDay(),
                time_stamp: current_range.getTime()
            })

            var month = (current_range.getMonth() + 1) < 10 ? `0${current_range.getMonth() + 1}` : current_range.getMonth() + 1;

            if (!range_months.includes(month)) {
                range_months.push(month);
            }
        }

        //Se as datas forem iguais não será criado nenhum range
        //Criar um range de data para a data de hoje.
        if (range_dates.length == 0) {
            range_dates.push({
                o_stamp: this.getFormattedDate(current_range),//Original stamp normal
                stamp: this.getFormattedDateReverse(current_range),//Reverse stamp 
                day_of_week: current_range.getDay()
            })
        }

        return {
            range_dates: range_dates,
            range_months: range_months
        }
    },
    convertToDate(date: any) {
        const split = date.split("/");

        var date: any = new Date(split[2] || 0, split[1] || 0, split[0]);
        date.setMonth(date.getMonth() - 1);

        return date;
    },
    timeDiffCalculate(dateFuture: any, dateNow: any, media?: number) {
        let diffInMilliSeconds = media ? Math.abs(dateFuture - dateNow) / 1000 / media : Math.abs(dateFuture - dateNow) / 1000;

        const days = Math.floor(diffInMilliSeconds / 86400);
        diffInMilliSeconds -= days * 86400;

        const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
        diffInMilliSeconds -= hours * 3600;

        const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
        diffInMilliSeconds -= minutes * 60;

        let difference = "";

        if (days) {
            difference += `${days}d `
        }

        difference += `${hours}h `;

        difference += `${minutes}m`

        return difference;
    },
    getHoursComplete(date: Date) {
        const hours = new Date(date).getUTCHours();
        const minutes = new Date(date).getUTCMinutes();
        const seconds = new Date(date).getUTCSeconds();

        return `${GetZero(hours)}:${GetZero(minutes)}:${GetZero(seconds)}`
    },
    getTodayStartDate() {
        const startDate = new Date(new Date().setUTCHours(1)).getTime();

        return new Date(startDate);
    },
    getInstance: function (milliseconds = new Date().getTime(), diffHours: number = -3) {
        let date = new Date(milliseconds);
        let hours = date.getHours();
        hours += diffHours;
        date.setHours(hours)
        return date;
    },
    getDateBeginAndEndDay() {
        const startDate = this.getInstance(new Date().getTime()).toISOString().slice(0, 10)
        const endDate = this.getInstance(new Date().getTime())

        return {
            startDate: new Date(startDate),
            endDate: endDate
        }
    },
    getDateBeginAndEndYear(year: number) {
        const startDate = new Date(`${year}-01-01`)
        const endDate = new Date(`${year}-12-31 21:00`)

        return {
            startDate: startDate,
            endDate: endDate,
        }
    },
    getDateBeginAndEndMonth(month: number, year: number) {
        const startDate = new Date(`${year}-${month}-01`)
        const endDate = new Date(`${year}-${month}-31 20:59`)

        return {
            startDate: startDate,
            endDate: endDate,
        }
    },
    getListOfMonths() {
        const listOfMonths: { name: string, monthNumber: number, items: any }[] = [
            { name: "Janeiro", monthNumber: 1, items: [] },
            { name: "Fevereiro", monthNumber: 2, items: [] },
            { name: "Março", monthNumber: 3, items: [] },
            { name: "Abril", monthNumber: 4, items: [] },
            { name: "Maio", monthNumber: 5, items: [] },
            { name: "Junho", monthNumber: 6, items: [] },
            { name: "Julho", monthNumber: 7, items: [] },
            { name: "Agosto", monthNumber: 8, items: [] },
            { name: "Setembro", monthNumber: 9, items: [] },
            { name: "Outubro", monthNumber: 10, items: [] },
            { name: "Novembro", monthNumber: 11, items: [] },
            { name: "Dezembro", monthNumber: 12, items: [] }
        ];

        return listOfMonths;
    },
    getEndDate(dateInput: Date) {
        return new Date(new Date(dateInput).setUTCHours(23, 59, 59, 59));;
    },
    getInitDateAndEndDate(currentDate: Date, customEndDate?: Date) {
        let data = {
            initDate: new Date(),
            endDate: new Date()
        }

        const now = currentDate;

        if (!customEndDate) {

            const initDate = new Date(Date.UTC(now.getFullYear(), now.getMonth() + 1, 0));
            initDate.setDate(0);
            const endDate = new Date(Date.UTC(now.getFullYear(), now.getMonth() + 2, 0));
            endDate.setDate(0);

            data.initDate = initDate;
            data.endDate = endDate;

        } else {

            const initDate = new Date(Date.UTC(now.getFullYear(), now.getMonth() + 1, 0));
            initDate.setDate(0);
            const endDate = new Date(Date.UTC(customEndDate.getFullYear(), customEndDate.getMonth() + 2, 0));
            endDate.setDate(0);

            data.initDate = initDate;
            data.endDate = endDate;

        }

        return data;
    }
}


export const dateConvert = (date: string) => {

    const token2 = date.split('T');
    const dateToken = token2[0].split('-');
    const year = dateToken[0].split('"')


    switch (dateToken[1]) {
        case '01':
            dateToken[1] = '01';
            break;
        case '02':
            dateToken[1] = '02';
            break;
        case '03':
            dateToken[1] = '03';
            break;
        case '04':
            dateToken[1] = '04';
            break;
        case '05':
            dateToken[1] = '05';
            break;
        case '06':
            dateToken[1] = '06';
            break;
        case '07':
            dateToken[1] = '07';
            break;
        case '08':
            dateToken[1] = '08';
            break;
        case '09':
            dateToken[1] = '09';
            break;
        case '10':
            dateToken[1] = '10';
            break;
        case '11':
            dateToken[1] = '11';
            break;
        case '12':
            dateToken[1] = '12';
            break;
        default:
            dateToken[1] = 'Invalid Month';
    }
    return `${dateToken[2]}/${dateToken[1]}/${year[1]}`;
}