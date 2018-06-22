import { BaseEntity } from './../../shared';

export const enum EstadoSuscripcion {
    'VIGENTE',
    'EXPIRADO',
    'PENDIENTE',
    'RECHAZADO'
}

export class Suscripcion implements BaseEntity {
    constructor(
        public id?: number,
        public detalle?: string,
        public fechaCreacion?: any,
        public estado?: EstadoSuscripcion,
        public fechaCancelacion?: any,
        public fechaCobro?: any,
        public usuarioId?: number,
        public comercioId?: number,
        public pedidos?: BaseEntity[],
        public historicoEntregases?: BaseEntity[],
    ) {
    }
}
