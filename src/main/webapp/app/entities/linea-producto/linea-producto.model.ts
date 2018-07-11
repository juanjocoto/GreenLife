import { BaseEntity } from './../../shared';

export class LineaProducto implements BaseEntity {
    constructor(
        public id?: number,
        public cantidad?: number,
        public pedidoId?: number,
        public productoId?: number,
    ) {
    }
}
