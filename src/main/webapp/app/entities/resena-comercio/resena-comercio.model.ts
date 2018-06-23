import { BaseEntity } from './../../shared';

export class ResenaComercio implements BaseEntity {
    constructor(
        public id?: number,
        public fechaCreacion?: any,
        public calificacion?: number,
        public comentario?: string,
        public usuarioId?: number,
        public comercioId?: number,
    ) {
    }
}
