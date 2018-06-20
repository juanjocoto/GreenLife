import { BaseEntity } from './../../shared';

export class CentroAcopio implements BaseEntity {
    constructor(
        public id?: number,
        public fechaCreacion?: any,
        public nombre?: string,
        public telefono?: string,
        public direccion?: string,
        public latitud?: number,
        public longitud?: number,
        public sitioWeb?: string,
        public correo?: string,
        public fotos?: BaseEntity[],
    ) {
    }
}
