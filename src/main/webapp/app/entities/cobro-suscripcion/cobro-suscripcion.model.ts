import { BaseEntity } from './../../shared';

export class CobroSuscripcion implements BaseEntity {
    constructor(
        public id?: number,
        public fecha?: any,
        public pagoId?: number,
        public clienteId?: number,
        public comercioId?: number,
        public suscripcionId?: number,
    ) {
    }
}
