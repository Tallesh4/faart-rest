import { BaseInterface } from "../../../base/base.interface";
import { id } from "../../../base/base.repository";
import { UserInterface } from "../../user/user.interface";
import { PasswordInterface } from "../password/password.interface";

export interface VerifyInterface extends BaseInterface {
    code?: number,
    token?: string,
    expireAt?: Date,
    passwordId: id | undefined
    remainingAttempts?: number,
    userId?: id,

    //relations
    password?: PasswordInterface,
    user?: UserInterface
}