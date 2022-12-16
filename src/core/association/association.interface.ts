import { BaseInterface } from "../../base/base.interface";
import { id } from "../../base/base.repository";

export interface AssociationInterface extends BaseInterface {
    federationId?: id,
    entityName: string;
    fantasyName: string;
    legalForm: string;
    addressId?: id,
    phone: string;
    email: string;
    cnpj: string;
}