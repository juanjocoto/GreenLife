import { BaseEntity } from './../../shared';

export class ResenaCliente implements BaseEntity {
    constructor(
        public id?: number,
        public fechaCreacion?: any,
        public calificacion?: number,
        public comentario?: string,
        public comercioId?: number,
        public clienteId?: number,
    ) {
    }
}
