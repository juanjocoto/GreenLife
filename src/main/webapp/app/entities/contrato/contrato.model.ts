import { BaseEntity } from './../../shared';

export class Contrato implements BaseEntity {
    constructor(
        public id?: number,
        public fechaCreacion?: any,
        public tipoId?: number,
        public comercioId?: number,
    ) {
    }
}
