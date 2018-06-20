import { BaseEntity } from './../../shared';

export class Fotografia implements BaseEntity {
    constructor(
        public id?: number,
        public urlImage?: string,
        public centroAcopioId?: number,
        public comercioId?: number,
        public productoId?: number,
        public publicacionId?: number,
        public eventoId?: number,
        public patrocinadorId?: number,
    ) {
    }
}
