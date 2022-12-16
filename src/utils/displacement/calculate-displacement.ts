/* eslint-disable */

import Calendar from "../calendar";
import GetDistanceFromLatLngInKm from "../distance-from-lat-lng";
import SortList from "../sort-list";



export default {
    calculateAllDisplacement: function (displacement: any) {
        var journey_time = 0;
        var displacement_km = 0.0;
        var displacement_time = 0;
        var days_count = 0;

        if (displacement && displacement.length > 0) {

            SortList.increasing(displacement, "time");
            SortList.increasing(displacement, "visit_date");

            var calcule_displacement_day: any = {};

            try {

                for (var i = 0; i < displacement.length; i++) {

                    var c_position = i;

                    let c_displacement = displacement[c_position];

                    var next_displacement = displacement[(c_position) + 1];

                    if (next_displacement) {


                        //Verificar se as visitas aconteceram no mesmo dia.
                        if (!calcule_displacement_day[c_displacement.visit_date]) {
                            calcule_displacement_day[c_displacement.visit_date] = {
                                journey_time: 0,
                                displacement_km: 0,
                                displacement_time: 0,
                                checkouts: 0
                            }
                            days_count++;
                        }

                        var c_calcule_day = calcule_displacement_day[c_displacement.visit_date];

                        if (c_displacement.ref == "check_out" && next_displacement.ref == "check_in") {

                            c_calcule_day.displacement_time += Math.abs(next_displacement.time - c_displacement.time);
                        }

                        c_calcule_day.journey_time += Math.abs(next_displacement.time - c_displacement.time);

                        var displacement_km = GetDistanceFromLatLngInKm(
                            next_displacement.latlng[0], next_displacement.latlng[1],
                            c_displacement.latlng[0], c_displacement.latlng[1],
                        );


                        if (displacement_km > 200) {
                            displacement_km = 0.5;
                        }

                        c_calcule_day.displacement_km += displacement_km;

                        c_calcule_day.checkouts++;



                    }

                }

            } catch (err) {

            }

        }


        for (var key in calcule_displacement_day) {

            var c_calcule_day = calcule_displacement_day[key];

            var total_checkouts = c_calcule_day.checkouts;

            if (total_checkouts > 0) {

                if (c_calcule_day.journey_time) {
                    journey_time += c_calcule_day.journey_time / total_checkouts || 1;
                }
                if (c_calcule_day.displacement_km > 0) {
                    displacement_km += c_calcule_day.displacement_km / total_checkouts || 1;
                }

                if (c_calcule_day.displacement_time > 0) {
                    displacement_time += c_calcule_day.displacement_time / total_checkouts || 1;
                }
            }

        }

        journey_time = journey_time ? journey_time : 0;
        displacement_km = displacement_km ? displacement_km : 0;

        var final_object = {
            journey_time: journey_time,
            displacement_km: displacement_km,
            displacement_time: displacement_time,
            days_count: days_count
        }

        return final_object;

    },
    calculateAllDisplacementDay: function (displacement: any) {

        if (displacement && displacement.length > 0) {

            var journey_time: any = 0;
            var displacement_km: any = 0.0;
            var displacement_time: any = 0;
            var days_count: any = 0;

            SortList.increasing(displacement, "time");
            SortList.increasing(displacement, "visitDate");

            var calcule_displacement_day: any = {};

            try {

                for (var i = 0; i < displacement.length; i++) {

                    var c_position = i;

                    let c_displacement = displacement[c_position];

                    var next_displacement = displacement[(c_position) + 1];

                    if (next_displacement) {

                        //Verificar se as visitas aconteceram no mesmo dia.
                        if (!calcule_displacement_day[c_displacement.visitDate]) {
                            calcule_displacement_day[c_displacement.visitDate] = {
                                journey_time: 0,
                                displacement_km: 0,
                                displacement_time: 0,
                                checkouts: 0
                            }
                            days_count++;
                        }

                        var c_calcule_day = calcule_displacement_day[c_displacement.visitDate];

                        if (c_displacement.ref == "check_in" && next_displacement.ref == "check_out") {
                            
                            c_calcule_day.displacement_time += Math.abs(next_displacement.time - c_displacement.time);
                        }

                        c_calcule_day.journey_time += Math.abs(next_displacement.time - c_displacement.time);

                        var displacement_km: any = GetDistanceFromLatLngInKm(
                            next_displacement.latLong[0], next_displacement.latLong[1],
                            c_displacement.latLong[0], c_displacement.latLong[1],
                        );


                        if (displacement_km > 200) {
                            displacement_km = 0.5;
                        }

                        c_calcule_day.displacement_km += displacement_km;
                        c_calcule_day.checkouts++;
                    }

                }

            } catch (err) {

            }
        }

        for (var key in calcule_displacement_day) {

            var c_calcule_day = calcule_displacement_day[key];

            var total_checkouts = c_calcule_day.checkouts;

            if (c_calcule_day.journey_time) {
                journey_time += c_calcule_day.journey_time;
            }
            if (c_calcule_day.displacement_km > 0) {
                displacement_km += c_calcule_day.displacement_km;
            }

            if (c_calcule_day.displacement_time > 0) {
                displacement_time += c_calcule_day.displacement_time;
            }

        }

        journey_time = journey_time ? journey_time : 0;
        displacement_km = displacement_km ? displacement_km : 0;

        var final_object = {
            journey_time: journey_time,
            displacement_km: displacement_km,
            displacement_time: displacement_time,
            days_count: days_count
        }

        return final_object;

    },
    calculateMonthDisplacement: function (displacement: any) {

        var time_of_pdv = 0;
        var journey_time = 0;
        var displacement_km = 0.0;
        var displacement_time = 0;
        var total_days = 0;
        var total_checkouts = 0;

        if (displacement && displacement.length > 0) {

            SortList.increasing(displacement, "time");
            SortList.increasing(displacement, "visitDate");

            var calcule_displacement_day: any = {};

            try {

                for (var i = 0; i < displacement.length; i++) {

                    var c_position = i;

                    let c_displacement = displacement[c_position];

                    //Verificar se as visitas aconteceram no mesmo dia.
                    if (!calcule_displacement_day[Calendar.getFormattedDate(new Date(c_displacement.visitDate))]) {
                        calcule_displacement_day[Calendar.getFormattedDate(new Date(c_displacement.visitDate))] = {
                            checkins: [],
                            checkouts: [],
                            fist_checkin: 0,
                            last_checkout: 0
                        };
                    }

                    var c_calcule_day = calcule_displacement_day[Calendar.getFormattedDate(new Date(c_displacement.visitDate))];

                    if (c_displacement.ref == "check_in") {
                        c_calcule_day.checkins.push(c_displacement)
                    }

                    if (c_displacement.ref == "check_out") {
                        c_calcule_day.checkouts.push(c_displacement)
                    }

                }

            } catch (err) {
                console.log(err);
            }

        }

        //Visão mensal, checkouts totais.
        /**
         * Calculamos a jornada diária
        **/
       
        for (let indexDisplacement in calcule_displacement_day) {

            const c_calcule_day = calcule_displacement_day[indexDisplacement];

            if(c_calcule_day && c_calcule_day.checkins.length && c_calcule_day.checkouts.length){

                const checkins = c_calcule_day.checkins;
                const checkouts = c_calcule_day.checkouts;
    
                total_checkouts += checkouts.length;
    
                c_calcule_day.fist_checkin = checkins[0].time;
    
                if(checkouts[checkouts.length - 1]){
    
                    c_calcule_day.last_checkout = checkouts[checkouts.length - 1].time;
        
                    total_days += 1;
        
                    journey_time += Math.abs(c_calcule_day.last_checkout - c_calcule_day.fist_checkin);
        
        
                    for (var position = 0; position < checkouts.length; position++) {
                        const checkin = checkins[position];
                        const checkout = checkouts[position];
        
                        if(checkin && checkout){
                            
                            var next_checkin = checkins[position + 1]; 
            
                            //Calcular tempo por pdv
                            time_of_pdv += Math.abs(checkout.time - checkin.time);
            
            
                            if(next_checkin){
                                displacement_time += Math.abs(checkout.time - next_checkin.time);
                            }
                            
            
                            //Calcular deslocamento
                            displacement_km += GetDistanceFromLatLngInKm(
                                checkin.latLong[0], checkin.latLong[1],
                                checkout.latLong[0], checkout.latLong[1],
                            );
                        }
        
                    }
                }
            }

        }

        var final_object = {
            //calcule_displacement_day: calcule_displacement_day,
            time_of_pdv: time_of_pdv / total_checkouts,
            journey_time: journey_time / total_days,
            displacement_km: displacement_km / total_days,
            displacement_time: displacement_time / total_days,
        }

        return final_object;

    }
}