import { BaseInterface } from "../../base/base.interface";
import { id } from "../../base/base.repository";
import { StateInterface } from "../state/state.interface";

export interface CityInterface extends BaseInterface {
    name: string,
    code: string,
    phoneCode?: string,
    lat?: string,
    long?: string,
    stateId: id | undefined,

    //Relations
    state?: StateInterface
}

