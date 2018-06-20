import { BaseEntity } from './../../shared';

export class LineaEntrega implements BaseEntity {
    constructor(
        public id?: number,
        public cantidad?: number,
        public productoId?: number,
        public entregaId?: number,
    ) {
    }
}
