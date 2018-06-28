import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
    CadenaOrdenRecoleccionComponent,
    CadenaOrdenRecoleccionDeleteDialogComponent,
    CadenaOrdenRecoleccionDeletePopupComponent,
    CadenaOrdenRecoleccionDetailComponent,
    CadenaOrdenRecoleccionDialogComponent,
    CadenaOrdenRecoleccionPopupComponent,
    CadenaOrdenRecoleccionPopupService,
    CadenaOrdenRecoleccionService,
    cadenaOrdenRecoleccionPopupRoute,
    cadenaOrdenRecoleccionRoute,
} from './';

import { GreenlifeSharedModule } from '../../shared';
import { RouterModule } from '@angular/router';
import { cadenaEntregaRoute } from './../cadena-entrega/cadena-entrega.route';
import { enviroment } from './../../enviroment';

cadenaEntregaRoute.forEach((a) => a.path = `${enviroment.cmsPath}/${a.path}`);

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
