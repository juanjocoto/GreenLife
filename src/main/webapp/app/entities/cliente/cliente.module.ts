import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenlifeSharedModule } from '../../shared';
import {
    ClienteService,
    ClientePopupService,
    ClienteComponent,
    ClienteDetailComponent,
    ClienteDialogComponent,
    ClientePopupComponent,
    ClienteDeletePopupComponent,
    ClienteDeleteDialogComponent,
    clienteRoute,
    clientePopupRoute,
} from './';

const ENTITY_STATES = [
    ...clienteRoute,
    ...clientePopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ClienteComponent,
        ClienteDetailComponent,
        ClienteDialogComponent,
        ClienteDeleteDialogComponent,
        ClientePopupComponent,
        ClienteDeletePopupComponent,
    ],
    entryComponents: [
        ClienteComponent,
        ClienteDialogComponent,
        ClientePopupComponent,
        ClienteDeleteDialogComponent,
        ClienteDeletePopupComponent,
    ],
    providers: [
        ClienteService,
        ClientePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeClienteModule {}
