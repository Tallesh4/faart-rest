import { BaseInterface } from "../../base/base.interface";
import { id } from "../../base/base.repository";

export interface RegistrationFormInterface extends BaseInterface {
    entityName: string;
    fantasyName: string;
    legalForm: string;
    addressAssociationId?: id,
    phoneAssociation: string;
    emailAssociation: string;
    cnpjAssociation: string;

    name: string;
    job: string;
    addressResponsibleId?: id,
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

