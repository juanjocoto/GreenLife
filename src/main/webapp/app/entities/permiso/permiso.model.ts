import { BaseEntity } from './../../shared';

export class Permiso implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public descripcion?: string,
    ) {
    }
}
