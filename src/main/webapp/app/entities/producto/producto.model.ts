import { BaseEntity } from './../../shared';

export class Producto implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public descripcion?: string,
        public precio?: number,
        public fechaCreacion?: any,
        public comercioId?: number,
        public fotos?: BaseEntity[],
        public etiquetas?: BaseEntity[],
        public categorias?: BaseEntity[],
    ) {
    }
}
