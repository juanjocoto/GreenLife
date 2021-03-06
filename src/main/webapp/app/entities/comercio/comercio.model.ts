import { BaseEntity } from './../../shared';

export enum TipoComercio {
    RESTAURANTE = 'RESTAURANTE',
    TIENDA = 'TIENDA'
}

export class Comercio implements BaseEntity {
    constructor(
        public id?: number,
        public fechaCreacion?: any,
        public cedJuridica?: string,
        public razonSocial?: string,
        public nombreComercial?: string,
        public tipo?: TipoComercio,
        public logoUrl?: string,
        public resenasClientes?: BaseEntity[],
        public resenasPropias?: BaseEntity[],
        public productos?: BaseEntity[],
        public locales?: BaseEntity[],
        public suscriptores?: BaseEntity[],
        public fotos?: BaseEntity[],
        public contratos?: BaseEntity[],
        public etiquetas?: BaseEntity[],
        public categorias?: BaseEntity[],
        public duenoId?: number,
    ) {
    }
}
