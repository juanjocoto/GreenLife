import { BaseEntity } from './../../shared';

export const enum EstadoSolicitud {
    'ACEPATDO',
    'DENEGADO'
}

export class SolicitudSuscripcion implements BaseEntity {
    constructor(
        public id?: number,
        public fecha?: any,
        public estado?: EstadoSolicitud,
        public descripcion?: string,
        public solicitanteId?: number,
        public comercioId?: number,
    ) {
    }
}
