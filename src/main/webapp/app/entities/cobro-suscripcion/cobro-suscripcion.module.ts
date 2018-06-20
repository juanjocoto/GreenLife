import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenlifeSharedModule } from '../../shared';
import {
    CobroSuscripcionService,
    CobroSuscripcionPopupService,
    CobroSuscripcionComponent,
    CobroSuscripcionDetailComponent,
    CobroSuscripcionDialogComponent,
    CobroSuscripcionPopupComponent,
    CobroSuscripcionDeletePopupComponent,
    CobroSuscripcionDeleteDialogComponent,
    cobroSuscripcionRoute,
    cobroSuscripcionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cobroSuscripcionRoute,
    ...cobroSuscripcionPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CobroSuscripcionComponent,
        CobroSuscripcionDetailComponent,
        CobroSuscripcionDialogComponent,
        CobroSuscripcionDeleteDialogComponent,
        CobroSuscripcionPopupComponent,
        CobroSuscripcionDeletePopupComponent,
    ],
    entryComponents: [
        CobroSuscripcionComponent,
        CobroSuscripcionDialogComponent,
        CobroSuscripcionPopupComponent,
        CobroSuscripcionDeleteDialogComponent,
        CobroSuscripcionDeletePopupComponent,
    ],
    providers: [
        CobroSuscripcionService,
        CobroSuscripcionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeCobroSuscripcionModule {}
