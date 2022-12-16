import { BaseInterface } from "../../../base/base.interface";
import { id } from "../../../base/base.repository";

export interface PasswordResetInterface extends BaseInterface {
    token?: string,
    expireAt?: Date,
    code?: string,
    passwordId: id | undefined,
}