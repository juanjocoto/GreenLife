import { BaseEntity } from './../../shared';

export class OrdenRecoleccion implements BaseEntity {
    constructor(
        public id?: number,
        public fechaCrecion?: any,
        public fechaSolicitud?: any,
        public estados?: BaseEntity[],
        public solicitanteId?: number,
        public recolectorId?: number,
    ) {
    }
}
