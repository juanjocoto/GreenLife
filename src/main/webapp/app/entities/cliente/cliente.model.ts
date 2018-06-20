import { BaseEntity } from './../../shared';

export class Cliente implements BaseEntity {
    constructor(
        public id?: number,
        public usuarioNombre?: string,
        public usuarioId?: number,
        public resenas?: BaseEntity[],
        public suscripciones?: BaseEntity[],
        public solicitudesRecoleccions?: BaseEntity[],
    ) {
    }
}
