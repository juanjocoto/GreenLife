import { BaseEntity } from './../../shared';
import { Producto } from '../producto';

export class LineaEntrega implements BaseEntity {

    constructor(
        public id?: number,
        public cantidad?: number,
        public productoId?: number,
        public entregaId?: number,
        public producto?: Producto
    ) {
    }
}
