import { BaseEntity } from './../../shared';

export class Pedido implements BaseEntity {
    constructor(
        public id?: number,
        public hora?: string,
        public suscripcionId?: number,
        public entregases?: BaseEntity[],
        public lineas?: BaseEntity[],
        public diasEntregaNombre?: string,
        public diasEntregaId?: number,
        public localNombre?: string,
        public localId?: number,
    ) {
    }
}
