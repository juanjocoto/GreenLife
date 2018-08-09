import { BaseEntity } from './../../shared';

export class Entrega implements BaseEntity {
    constructor(
        public id?: number,
        public fechaInicio?: any,
        public suscripcionId?: number,
        public pedidoId?: number,
        public cadenaId?: number,
        public lineas?: BaseEntity[],
    ) {
    }
}
