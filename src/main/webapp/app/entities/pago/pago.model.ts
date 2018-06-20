import { BaseEntity } from './../../shared';

export class Pago implements BaseEntity {
    constructor(
        public id?: number,
        public fecha?: any,
    ) {
    }
}
