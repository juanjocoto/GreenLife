import { BaseEntity } from './../../shared';

export const enum EstadoCadena {
    'PREPARACION',
    'EN_CAMINO',
    'ENTREGADO'
}

export class CadenaEntrega implements BaseEntity {
    constructor(
        public id?: number,
        public info?: string,
        public fecha?: any,
        public estado?: EstadoCadena,
        public entregaId?: number,
        public previoId?: number,
    ) {
    }
}
