import { BaseInterface } from "../../base/base.interface";
import { id } from "../../base/base.repository";
import { CityInterface } from "../city/city.interface";

export interface AddressInterface extends BaseInterface {
    number: string,
    street: string,
    zipCode: string,
    complement?: string,
    lat?: number,
    lng?: number,
    cityId: id | undefined,

    city?: CityInterface,
}