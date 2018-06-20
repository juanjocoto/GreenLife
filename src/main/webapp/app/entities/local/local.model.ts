import { BaseEntity } from './../../shared';

export class Local implements BaseEntity {
    constructor(
        public id?: number,
        public fechaCreacion?: any,
        public nombre?: string,
        public direccion?: string,
        public latitud?: number,
        public latitude?: number,
        public horario?: string,
        public telefono?: string,
        public fachadaId?: number,
        public comercioRazonSocial?: string,
        public comercioId?: number,
    ) {
    }
}
