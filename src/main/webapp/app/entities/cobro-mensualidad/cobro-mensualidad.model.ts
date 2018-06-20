import { BaseEntity } from './../../shared';

export class CobroMensualidad implements BaseEntity {
    constructor(
        public id?: number,
        public fecha?: any,
        public pagoId?: number,
        public contratoId?: number,
    ) {
    }
}
