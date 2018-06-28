import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
    CobroMensualidadComponent,
    CobroMensualidadDeleteDialogComponent,
    CobroMensualidadDeletePopupComponent,
    CobroMensualidadDetailComponent,
    CobroMensualidadDialogComponent,
    CobroMensualidadPopupComponent,
    CobroMensualidadPopupService,
    CobroMensualidadService,
    cobroMensualidadPopupRoute,
    cobroMensualidadRoute,
} from './';

import { GreenlifeSharedModule } from '../../shared';
import { RouterModule } from '@angular/router';
import { enviroment } from './../../enviroment';

cobroMensualidadRoute.forEach((a) => a.path = `${enviroment.cmsPath}/${a.path}`);

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
