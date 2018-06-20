import { BaseEntity } from './../../shared';

export class OrdenRecoleccion implements BaseEntity {
    constructor(
        public id?: number,
        public fechaCrecion?: any,
        public fechaSolicitud?: any,
        public clienteId?: number,
        public recolectorId?: number,
        public estados?: BaseEntity[],
    ) {
    }
}
