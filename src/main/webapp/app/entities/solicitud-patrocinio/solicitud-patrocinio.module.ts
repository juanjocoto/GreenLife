import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenlifeSharedModule } from '../../shared';
import {
    SolicitudPatrocinioService,
    SolicitudPatrocinioPopupService,
    SolicitudPatrocinioComponent,
    SolicitudPatrocinioDetailComponent,
    SolicitudPatrocinioDialogComponent,
    SolicitudPatrocinioPopupComponent,
    SolicitudPatrocinioDeletePopupComponent,
    SolicitudPatrocinioDeleteDialogComponent,
    solicitudPatrocinioRoute,
    solicitudPatrocinioPopupRoute,
} from './';

const ENTITY_STATES = [
    ...solicitudPatrocinioRoute,
    ...solicitudPatrocinioPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SolicitudPatrocinioComponent,
        SolicitudPatrocinioDetailComponent,
        SolicitudPatrocinioDialogComponent,
        SolicitudPatrocinioDeleteDialogComponent,
        SolicitudPatrocinioPopupComponent,
        SolicitudPatrocinioDeletePopupComponent,
    ],
    entryComponents: [
        SolicitudPatrocinioComponent,
        SolicitudPatrocinioDialogComponent,
        SolicitudPatrocinioPopupComponent,
        SolicitudPatrocinioDeleteDialogComponent,
        SolicitudPatrocinioDeletePopupComponent,
    ],
    providers: [
        SolicitudPatrocinioService,
        SolicitudPatrocinioPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeSolicitudPatrocinioModule {}
