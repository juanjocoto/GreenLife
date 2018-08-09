import { BaseEntity } from './../../shared';

export const enum EstadoCadena {
    'PREPARACION',
    'EN_CAMINO',
    'ENTREGADO',
    'PENDIENTE'
}

export class CadenaEntrega implements BaseEntity {
    constructor(
        public id?: number,
        public info?: string,
        public fecha?: any,
        public estado?: EstadoCadena,
        public previoId?: number,
    ) {
    }
}
