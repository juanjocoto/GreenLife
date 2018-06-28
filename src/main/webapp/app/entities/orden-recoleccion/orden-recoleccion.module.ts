import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
    OrdenRecoleccionComponent,
    OrdenRecoleccionDeleteDialogComponent,
    OrdenRecoleccionDeletePopupComponent,
    OrdenRecoleccionDetailComponent,
    OrdenRecoleccionDialogComponent,
    OrdenRecoleccionPopupComponent,
    OrdenRecoleccionPopupService,
    OrdenRecoleccionService,
    ordenRecoleccionPopupRoute,
    ordenRecoleccionRoute,
} from './';

import { GreenlifeSharedModule } from '../../shared';
import { RouterModule } from '@angular/router';
import { enviroment } from './../../enviroment';

ordenRecoleccionRoute.forEach((a) => a.path = `${enviroment.cmsPath}/${a.path}`);

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
