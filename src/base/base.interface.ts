import { id } from "./base.repository";


export interface BaseInterface {
    _id?: id,
    id?: id,
    enabled?: boolean,
    status?: number,
    createdAt?: Date,
    updatedAt?: Date
}
