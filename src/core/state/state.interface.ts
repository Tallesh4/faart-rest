import { BaseInterface } from "../../base/base.interface";
import { id } from "../../base/base.repository";
import { CountryInterface } from "../country/country.interface";

export interface StateInterface extends BaseInterface {
    name: string,
    code: string,
    phoneCode?: string,
    lat?: string,
    long?: string,
    countryId: id | undefined,

    //Relations
    country?: CountryInterface
}