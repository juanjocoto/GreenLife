import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenlifeSharedModule } from '../../shared';
import {
    CadenaOrdenRecoleccionService,
    CadenaOrdenRecoleccionPopupService,
    CadenaOrdenRecoleccionComponent,
    CadenaOrdenRecoleccionDetailComponent,
    CadenaOrdenRecoleccionDialogComponent,
    CadenaOrdenRecoleccionPopupComponent,
    CadenaOrdenRecoleccionDeletePopupComponent,
    CadenaOrdenRecoleccionDeleteDialogComponent,
    cadenaOrdenRecoleccionRoute,
    cadenaOrdenRecoleccionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cadenaOrdenRecoleccionRoute,
    ...cadenaOrdenRecoleccionPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CadenaOrdenRecoleccionComponent,
        CadenaOrdenRecoleccionDetailComponent,
        CadenaOrdenRecoleccionDialogComponent,
        CadenaOrdenRecoleccionDeleteDialogComponent,
        CadenaOrdenRecoleccionPopupComponent,
        CadenaOrdenRecoleccionDeletePopupComponent,
    ],
    entryComponents: [
        CadenaOrdenRecoleccionComponent,
        CadenaOrdenRecoleccionDialogComponent,
        CadenaOrdenRecoleccionPopupComponent,
        CadenaOrdenRecoleccionDeleteDialogComponent,
        CadenaOrdenRecoleccionDeletePopupComponent,
    ],
    providers: [
        CadenaOrdenRecoleccionService,
        CadenaOrdenRecoleccionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeCadenaOrdenRecoleccionModule {}
