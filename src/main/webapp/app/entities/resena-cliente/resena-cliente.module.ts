import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenlifeSharedModule } from '../../shared';
import {
    ResenaClienteService,
    ResenaClientePopupService,
    ResenaClienteComponent,
    ResenaClienteDetailComponent,
    ResenaClienteDialogComponent,
    ResenaClientePopupComponent,
    ResenaClienteDeletePopupComponent,
    ResenaClienteDeleteDialogComponent,
    resenaClienteRoute,
    resenaClientePopupRoute,
} from './';

const ENTITY_STATES = [
    ...resenaClienteRoute,
    ...resenaClientePopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ResenaClienteComponent,
        ResenaClienteDetailComponent,
        ResenaClienteDialogComponent,
        ResenaClienteDeleteDialogComponent,
        ResenaClientePopupComponent,
        ResenaClienteDeletePopupComponent,
    ],
    entryComponents: [
        ResenaClienteComponent,
        ResenaClienteDialogComponent,
        ResenaClientePopupComponent,
        ResenaClienteDeleteDialogComponent,
        ResenaClienteDeletePopupComponent,
    ],
    providers: [
        ResenaClienteService,
        ResenaClientePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeResenaClienteModule {}
