import { BaseEntity } from './../../shared';

export class Configuracion implements BaseEntity {
    constructor(
        public id?: number,
        public calificacionMinima?: number,
        public calificacionMaxima?: number,
        public nombreAplicacion?: string,
        public razonSocial?: string,
        public cedJuridica?: string,
        public direccion?: string,
        public latitud?: number,
        public longitud?: number,
        public telefono?: string,
        public urlLogo?: string,
    ) {
    }
}
