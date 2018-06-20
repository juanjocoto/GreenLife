import { BaseEntity } from './../../shared';

export class Patrocinador implements BaseEntity {
    constructor(
        public id?: number,
        public fechaCreacion?: any,
        public nombre?: string,
        public cedJuridica?: string,
        public correo?: string,
        public solicitudId?: number,
        public fotos?: BaseEntity[],
        public eventos?: BaseEntity[],
    ) {
    }
}
