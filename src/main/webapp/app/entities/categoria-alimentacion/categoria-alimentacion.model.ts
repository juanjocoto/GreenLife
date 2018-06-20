import { BaseEntity } from './../../shared';

export class CategoriaAlimentacion implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public descripcion?: string,
    ) {
    }
}
