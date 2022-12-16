import { BaseInterface } from "../../base/base.interface";
import { id } from "../../base/base.repository";
import { PermissionInterface } from "../permission/permission.interface";
import { UserInterface } from "../user/user.interface";

export interface HierarchyInterface extends BaseInterface {
    tag: string,
    name: string,
    level: number,
    permissionIds?: id[]

    //Relations
    permissions?: PermissionInterface[],
    users?: UserInterface[],
}