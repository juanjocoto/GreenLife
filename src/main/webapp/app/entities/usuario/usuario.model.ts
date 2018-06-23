import { BaseEntity } from './../../shared';

export class Usuario implements BaseEntity {
    constructor(
        public id?: number,
        public fechaCreacion?: any,
        public fechaNacimiento?: any,
        public cedula?: string,
        public direccion?: string,
        public telefono?: string,
        public fotoUrl?: string,
        public latitud?: number,
        public longitud?: number,
        public userDetailId?: number,
        public resenasComercios?: BaseEntity[],
        public suscripciones?: BaseEntity[],
        public solicitudesRecoleccions?: BaseEntity[],
        public ordenes?: BaseEntity[],
        public publicaciones?: BaseEntity[],
        public comentarios?: BaseEntity[],
        public comercios?: BaseEntity[],
    ) {
    }
}
