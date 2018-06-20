import { BaseEntity } from './../../shared';

export class TipoContrato implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public descripcion?: string,
        public costo?: number,
    ) {
    }
}
