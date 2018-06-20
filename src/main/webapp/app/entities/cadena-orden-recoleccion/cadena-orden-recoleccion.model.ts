import { BaseEntity } from './../../shared';

export const enum EstadoOrdenRecoleccion {
    'APROBADA',
    'EN_RUTA',
    'RECHAZADA',
    'FINALIZADA',
    'EN_ESPERA'
}

export class CadenaOrdenRecoleccion implements BaseEntity {
    constructor(
        public id?: number,
        public estado?: EstadoOrdenRecoleccion,
        public descripcion?: string,
        public ordenRecoleccionId?: number,
        public previoId?: number,
    ) {
    }
}
