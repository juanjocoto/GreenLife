import { BaseEntity } from './../../shared';

export class SolicitudPatrocinio implements BaseEntity {
    constructor(
        public id?: number,
        public fechaCreacion?: any,
        public nombre?: string,
        public cedJuridica?: string,
        public correo?: string,
        public datosAdicionales?: string,
    ) {
    }
}
