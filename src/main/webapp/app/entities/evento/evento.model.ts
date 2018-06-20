import { BaseEntity } from './../../shared';

export class Evento implements BaseEntity {
    constructor(
        public id?: number,
        public fechaCreacion?: any,
        public fechaActividad?: any,
        public nombre?: string,
        public direccion?: string,
        public latitud?: number,
        public longitud?: number,
        public horario?: string,
        public fotos?: BaseEntity[],
        public etiquetas?: BaseEntity[],
    ) {
    }
}
