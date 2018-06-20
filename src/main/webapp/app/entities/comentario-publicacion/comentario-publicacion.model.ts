import { BaseEntity } from './../../shared';

export class ComentarioPublicacion implements BaseEntity {
    constructor(
        public id?: number,
        public fechaCreacion?: any,
        public texto?: string,
        public usuarioId?: number,
        public publicacionId?: number,
    ) {
    }
}
