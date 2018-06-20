import { BaseEntity } from './../../shared';

export class Publicacion implements BaseEntity {
    constructor(
        public id?: number,
        public fechaCreacion?: any,
        public titulo?: string,
        public texto?: string,
        public usuarioId?: number,
        public comentarios?: BaseEntity[],
        public fotos?: BaseEntity[],
        public etiquetas?: BaseEntity[],
    ) {
    }
}
