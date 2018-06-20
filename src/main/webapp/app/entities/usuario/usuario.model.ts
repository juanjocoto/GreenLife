import { BaseEntity } from './../../shared';

export class Usuario implements BaseEntity {
    constructor(
        public id?: number,
        public fechaCreacion?: any,
        public fechaNacimiento?: any,
        public nombre?: string,
        public apellidos?: string,
        public cedula?: string,
        public direccion?: string,
        public telefono?: string,
        public latitud?: number,
        public longitud?: number,
        public contrasena?: string,
        public correo?: string,
        public estaActivado?: boolean,
        public nombreUsuario?: string,
        public fotoId?: number,
        public userDetailId?: number,
        public publicaciones?: BaseEntity[],
        public comentarios?: BaseEntity[],
        public rolNombre?: string,
        public rolId?: number,
    ) {
        this.estaActivado = false;
    }
}
