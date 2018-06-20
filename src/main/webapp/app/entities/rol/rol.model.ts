import { BaseEntity } from './../../shared';

export class Rol implements BaseEntity {
    constructor(
        public id?: number,
        public fechaCreacion?: any,
        public nombre?: string,
        public descripcion?: string,
        public permisos?: BaseEntity[],
    ) {
    }
}
