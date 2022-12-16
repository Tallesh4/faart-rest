import { BaseInterface } from "../../base/base.interface";

export interface EmailInterface extends BaseInterface {
    to: string,
    text: string,
    subject?: string,
    html?: string
}