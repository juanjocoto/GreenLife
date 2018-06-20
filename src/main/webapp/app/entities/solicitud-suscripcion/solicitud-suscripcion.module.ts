import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenlifeSharedModule } from '../../shared';
import {
    SolicitudSuscripcionService,
    SolicitudSuscripcionPopupService,
    SolicitudSuscripcionComponent,
    SolicitudSuscripcionDetailComponent,
    SolicitudSuscripcionDialogComponent,
    SolicitudSuscripcionPopupComponent,
    SolicitudSuscripcionDeletePopupComponent,
    SolicitudSuscripcionDeleteDialogComponent,
    solicitudSuscripcionRoute,
    solicitudSuscripcionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...solicitudSuscripcionRoute,
    ...solicitudSuscripcionPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SolicitudSuscripcionComponent,
        SolicitudSuscripcionDetailComponent,
        SolicitudSuscripcionDialogComponent,
        SolicitudSuscripcionDeleteDialogComponent,
        SolicitudSuscripcionPopupComponent,
        SolicitudSuscripcionDeletePopupComponent,
    ],
    entryComponents: [
        SolicitudSuscripcionComponent,
        SolicitudSuscripcionDialogComponent,
        SolicitudSuscripcionPopupComponent,
        SolicitudSuscripcionDeleteDialogComponent,
        SolicitudSuscripcionDeletePopupComponent,
    ],
    providers: [
        SolicitudSuscripcionService,
        SolicitudSuscripcionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeSolicitudSuscripcionModule {}
