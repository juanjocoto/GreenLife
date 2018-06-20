import { BaseEntity } from './../../shared';

export class Etiqueta implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public disponible?: boolean,
    ) {
        this.disponible = false;
    }
}
