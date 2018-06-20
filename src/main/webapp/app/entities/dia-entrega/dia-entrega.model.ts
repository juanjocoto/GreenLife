import { BaseEntity } from './../../shared';

export class DiaEntrega implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
    ) {
    }
}
