export const Calendar = {
    getDate: function (millis = new Date().getTime()) {
        return new Date(millis);
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

        return "";
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
        return "";
    },
    getFormattedDate: function (date: Date) {
        return `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}/${(date.getMonth() + 1) < 10 ? `0${(date.getMonth() + 1)}` : (date.getMonth() + 1)}/${date.getFullYear()}`;
    },
    getFormattedDateReverse: function (date: Date) {
        return `${date.getFullYear()}/${(date.getMonth() + 1) < 10 ? `0${(date.getMonth() + 1)}` : (date.getMonth() + 1)}/${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
    },
    getFormattedTime: function (date: Date) {
        let h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        let m = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        let s = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

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
            let time_seconds = Math.floor((time / 1000) % 60);
            let time_minutes = Math.floor((time / 1000 / 60) % 60);
            let time_hours = Math.floor(time / 1000 / 60 / 60);

            return `${time_hours || 0}:${time_minutes || 0}:${time_seconds || 0}`;
        }

        return `${0}:${0}:${0}`;
    },
    compareTimes(time1: number, time2: number) {
        return Math.abs(time1 - time2);
    },
    createRangeDates(from: Date, to: Date, min_date = 0) {
        let from_date = from;//Iniciar na data de hoje
        let to_date = to//Finalizar na data de hoje
        let current_range = new Date(to_date.getTime());

        let range_months: any[] = [];
        let range_dates = [];

        //Precisamos criar o range baseado no filtro passado pela requisição
        while (current_range > from_date) {

            if (current_range.getDate() > min_date) {
                range_dates.push({
                    o_stamp: this.getFormattedDate(current_range),//Original stamp normal
                    stamp: this.getFormattedDateReverse(current_range),//Reverse stamp
                    day_of_week: current_range.getDay(),
                    time_stamp: current_range.getTime()
                })

                let month = (current_range.getMonth() + 1) < 10 ? `0${current_range.getMonth() + 1}` : current_range.getMonth() + 1;

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

            let month = (current_range.getMonth() + 1) < 10 ? `0${current_range.getMonth() + 1}` : current_range.getMonth() + 1;

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
    createRangeDatesProductivity(from: Date, to: Date, min_date = 0) {
        let from_date = from;//Iniciar na data de hoje
        let to_date = to//Finalizar na data de hoje
        let current_range = new Date(to_date.getTime());

        let range_months: any[] = [];
        let range_dates = [];

        //Precisamos criar o range baseado no filtro passado pela requisição
        while (current_range > from_date) {

            if (current_range.getDate() > min_date) {
                range_dates.push({
                    o_stamp: this.getFormattedDate(current_range),//Original stamp normal
                    stamp: this.getFormattedDateReverse(current_range),//Reverse stamp
                    day_of_week: current_range.getDay(),
                    time_stamp: current_range.getTime()
                })

                let month = (current_range.getMonth() + 1) < 10 ? `0${current_range.getMonth() + 1}` : current_range.getMonth() + 1;

                if (!range_months.includes(month)) {
                    range_months.push(month);
                }
            }

            current_range.setDate(current_range.getDate() - 1);


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
    convertToDate(date: string) {//Convert date DD/MM/YYYY to time stamp
        let split: any[] = date.split("/");

        return new Date(split[2] || 0, split[1] || 0, split[0]);
    },
    convertTimestampToDate(timestamp: number) { //Convert date timeStamp to DD/MM/YYYY
        const date = new Date(timestamp).toISOString();

        const year = date.slice(0, 4)
        const mounth = date.slice(5, 7)
        const day = date.slice(8, 10)

        return `${day}/${mounth}/${year}`
    },
    getDateTimeLocal(date: Date) {
        let tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
        let localISOTime = (new Date(date.getTime() - tzoffset)).toISOString().slice(0, -1);
        return localISOTime;
    },
    getFormattedDateToInputDateFormat(date: Date): string {
        return `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? `0${(date.getMonth() + 1)}` : (date.getMonth() + 1)}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
    },
    getDateFromInputDateFormat(value: string): Date {
        let c_split = value.split("-")//Split string "," teremos um array com ["YYYY","MM","DD"]
        //Passando as informações para um objeto Date();
        let date = new Date(parseInt(c_split[0]), parseInt(c_split[1]) - 1, parseInt(c_split[2]));

        return date;
    },
    isValidDate(d: any) {
        if (Object.prototype.toString.call(d) === "[object Date]") {
            // it is a date
            if (isNaN(d)) { // d.getTime() or d.valueOf() will also work
                // date object is not valid
                return false;
            } else {
                // date object is valid
                return true;
            }
        } else {
            // not a date object
            return false;
        }
    },
    getInstance: function (milliseconds = new Date().getTime(), diffHours: number = -3) {
        let date = new Date(milliseconds);
        let hours = date.getHours();
        hours += diffHours;
        date.setHours(hours)
        return date;
    },

    getDateBeginAndEndDay(){
        const startDate = this.getInstance(new Date().getTime()).toISOString().slice(0, 10)
		const endDate = this.getInstance(new Date().getTime())

        return {
            startDate: new Date(startDate),
            endDate: endDate
        }
    },

    formattedDateProtheus(dateString: string){
        const year = dateString.slice(0, 4);
        const month = dateString.slice(4, 6);
        const day = dateString.slice(6, 8);

        const date = new Date(new Date(`${year}-${month}-${day}`).setUTCHours(23, 59, 59, 59));

        if(!date.getTime()){
            return null;
        }

        return date;
    }


}