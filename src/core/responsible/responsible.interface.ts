import { BaseInterface } from "../../base/base.interface";
import { id } from "../../base/base.repository";

export interface ResponsibleInterface extends BaseInterface {
    associationId: id;
    name: string;
    job: string;
    addressId?: id,
    cpf: string;
    email: string;
    phone: string;
    dateFiliation: Date;
    rg: string;
    bodyExpeditor: string;
    maritalStatus: string;
    naturalness: string;
    nationality: string;
    nArtisanWallet: string;
    dueDateArtisanWallet: Date;
}