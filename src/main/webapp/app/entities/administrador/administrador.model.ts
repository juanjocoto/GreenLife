import { BaseEntity } from './../../shared';

export class Administrador implements BaseEntity {
    constructor(
        public id?: number,
        public usuarioNombre?: string,
        public usuarioId?: number,
    ) {
    }
}
