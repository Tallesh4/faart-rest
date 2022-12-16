import { BaseInterface } from "../../base/base.interface";

export interface PermissionInterface extends BaseInterface {
    tag: string,
    collectionName?: string,
    type: string,
    name: string,
    description?: string,
}