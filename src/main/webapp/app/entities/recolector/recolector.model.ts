import { BaseEntity } from './../../shared';

export class Recolector implements BaseEntity {
    constructor(
        public id?: number,
        public usuarioNombre?: string,
        public usuarioId?: number,
        public ordenes?: BaseEntity[],
    ) {
    }
}
