import {Component, OnInit} from '@angular/core';

import {  UserService } from '../../../shared';

@Component({
    selector: 'jhi-usuario-roles',
    templateUrl: './usuario-roles.component.html',
    styleUrls: [
        'usuario-roles.scss'
    ]
})
export class UsuarioRolesComponent implements OnInit {

    listaRoles: any[];

    constructor(
        private userService: UserService
    ) {}

    ngOnInit() {
        this.listaRoles = [];
        this.userService.authorities().subscribe((authorities) => {
            this.listaRoles = authorities;
            this.formatoNombresRol();
        });
    }

    private formatoNombresRol(): void  {
         for (let i = 0; i < this.listaRoles.length; i++ ) {
            this.listaRoles[i] = this.listaRoles[i].replace(/ROLE_/i, '');
        }
    }
}
