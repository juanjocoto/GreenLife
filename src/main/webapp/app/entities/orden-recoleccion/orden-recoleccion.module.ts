import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenlifeSharedModule } from '../../shared';
import {
    OrdenRecoleccionService,
    OrdenRecoleccionPopupService,
    OrdenRecoleccionComponent,
    OrdenRecoleccionDetailComponent,
    OrdenRecoleccionDialogComponent,
    OrdenRecoleccionPopupComponent,
    OrdenRecoleccionDeletePopupComponent,
    OrdenRecoleccionDeleteDialogComponent,
    ordenRecoleccionRoute,
    ordenRecoleccionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...ordenRecoleccionRoute,
    ...ordenRecoleccionPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OrdenRecoleccionComponent,
        OrdenRecoleccionDetailComponent,
        OrdenRecoleccionDialogComponent,
        OrdenRecoleccionDeleteDialogComponent,
        OrdenRecoleccionPopupComponent,
        OrdenRecoleccionDeletePopupComponent,
    ],
    entryComponents: [
        OrdenRecoleccionComponent,
        OrdenRecoleccionDialogComponent,
        OrdenRecoleccionPopupComponent,
        OrdenRecoleccionDeleteDialogComponent,
        OrdenRecoleccionDeletePopupComponent,
    ],
    providers: [
        OrdenRecoleccionService,
        OrdenRecoleccionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeOrdenRecoleccionModule {}
