import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenlifeSharedModule } from '../../shared';
import {
    SuscripcionService,
    SuscripcionPopupService,
    SuscripcionComponent,
    SuscripcionDetailComponent,
    SuscripcionDialogComponent,
    SuscripcionPopupComponent,
    SuscripcionDeletePopupComponent,
    SuscripcionDeleteDialogComponent,
    suscripcionRoute,
    suscripcionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...suscripcionRoute,
    ...suscripcionPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SuscripcionComponent,
        SuscripcionDetailComponent,
        SuscripcionDialogComponent,
        SuscripcionDeleteDialogComponent,
        SuscripcionPopupComponent,
        SuscripcionDeletePopupComponent,
    ],
    entryComponents: [
        SuscripcionComponent,
        SuscripcionDialogComponent,
        SuscripcionPopupComponent,
        SuscripcionDeleteDialogComponent,
        SuscripcionDeletePopupComponent,
    ],
    providers: [
        SuscripcionService,
        SuscripcionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeSuscripcionModule {}
