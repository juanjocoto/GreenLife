import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenlifeSharedModule } from '../../shared';
import {
    CobroMensualidadService,
    CobroMensualidadPopupService,
    CobroMensualidadComponent,
    CobroMensualidadDetailComponent,
    CobroMensualidadDialogComponent,
    CobroMensualidadPopupComponent,
    CobroMensualidadDeletePopupComponent,
    CobroMensualidadDeleteDialogComponent,
    cobroMensualidadRoute,
    cobroMensualidadPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cobroMensualidadRoute,
    ...cobroMensualidadPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CobroMensualidadComponent,
        CobroMensualidadDetailComponent,
        CobroMensualidadDialogComponent,
        CobroMensualidadDeleteDialogComponent,
        CobroMensualidadPopupComponent,
        CobroMensualidadDeletePopupComponent,
    ],
    entryComponents: [
        CobroMensualidadComponent,
        CobroMensualidadDialogComponent,
        CobroMensualidadPopupComponent,
        CobroMensualidadDeleteDialogComponent,
        CobroMensualidadDeletePopupComponent,
    ],
    providers: [
        CobroMensualidadService,
        CobroMensualidadPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeCobroMensualidadModule {}
