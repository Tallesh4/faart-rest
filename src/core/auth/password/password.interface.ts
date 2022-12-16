import { BaseInterface } from "../../../base/base.interface";
import { id } from "../../../base/base.repository";
import { UserInterface } from "../../user/user.interface";

export interface PasswordInterface extends BaseInterface {
    hash: string,
    refreshTokens?: string[],
    userId: id | undefined

    //relations
    user?: UserInterface
}