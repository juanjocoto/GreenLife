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

import { CMS_PATH } from '../../app.constants';
import { GreenlifeSharedModule } from '../../shared';
import { RouterModule } from '@angular/router';

cobroMensualidadRoute.forEach((a) => a.path = `${CMS_PATH}/${a.path}`);

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
