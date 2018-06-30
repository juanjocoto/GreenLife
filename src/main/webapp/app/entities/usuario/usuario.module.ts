import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
    UsuarioComponent,
    UsuarioDeleteDialogComponent,
    UsuarioDeletePopupComponent,
    UsuarioDetailComponent,
    UsuarioDialogComponent,
    UsuarioPopupComponent,
    UsuarioPopupService,
    UsuarioService,
    usuarioPopupRoute,
    usuarioRoute
} from './';

import { CMS_PATH } from '../../app.constants';
import { GreenlifeAdminModule } from '../../admin/admin.module';
import { GreenlifeSharedModule } from '../../shared';
import { RouterModule } from '@angular/router';

usuarioRoute.forEach((a) => a.path = `${CMS_PATH}/${a.path}`);

const ENTITY_STATES = [
    ...usuarioRoute,
    ...usuarioPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        GreenlifeAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UsuarioComponent,
        UsuarioDetailComponent,
        UsuarioDialogComponent,
        UsuarioDeleteDialogComponent,
        UsuarioPopupComponent,
        UsuarioDeletePopupComponent,
    ],
    entryComponents: [
        UsuarioComponent,
        UsuarioDialogComponent,
        UsuarioPopupComponent,
        UsuarioDeleteDialogComponent,
        UsuarioDeletePopupComponent,
    ],
    providers: [
        UsuarioService,
        UsuarioPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeUsuarioModule { }
