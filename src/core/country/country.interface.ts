import { BaseInterface } from "../../base/base.interface";

export interface CountryInterface extends BaseInterface {
    name: string,
    code: string,
    phoneCode: string,
    currency: string,
    lat?: string,
    long?: string
}