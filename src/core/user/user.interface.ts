import { BaseInterface } from "../../base/base.interface";
import { id } from "../../base/base.repository";
import { AddressInterface } from "../address/address.interface";
import { HierarchyInterface } from "../hierarchy/hierarchy.interface";

export interface UserInterface extends BaseInterface {
    avatar?: string | null,
    username: string,
    email: string,
    name: string,
    phone?: string,
    addressId?: id,
    hierarchyId?: id,
    hierarchy?: HierarchyInterface,
    address?: AddressInterface,
}
