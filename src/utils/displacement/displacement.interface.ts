import { VisitCheckInInterface } from "../../core/visit-check-in/visit-check-in.interface";
import { VisitCheckOutInterface } from "../../core/visit-check-out/visit-check-out.interface";

export interface DisplacementCalculateInterface{
    visitDate: number,
    ref: string,
    time: number,
    latlng: number[]   
}

export type DisplacementTypes = VisitCheckInInterface | VisitCheckOutInterface;
