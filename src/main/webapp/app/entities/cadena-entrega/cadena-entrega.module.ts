import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
    CadenaEntregaComponent,
    CadenaEntregaDeleteDialogComponent,
    CadenaEntregaDeletePopupComponent,
    CadenaEntregaDetailComponent,
    CadenaEntregaDialogComponent,
    CadenaEntregaPopupComponent,
    CadenaEntregaPopupService,
    CadenaEntregaService,
    cadenaEntregaPopupRoute,
    cadenaEntregaRoute,
} from './';

import { GreenlifeSharedModule } from '../../shared';
import { RouterModule } from '@angular/router';
import { enviroment } from './../../enviroment';

cadenaEntregaRoute.forEach((a) => a.path = `${enviroment.cmsPath}/${a.path}`);

const ENTITY_STATES = [
    ...cadenaEntregaRoute,
    ...cadenaEntregaPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CadenaEntregaComponent,
        CadenaEntregaDetailComponent,
        CadenaEntregaDialogComponent,
        CadenaEntregaDeleteDialogComponent,
        CadenaEntregaPopupComponent,
        CadenaEntregaDeletePopupComponent,
    ],
    entryComponents: [
        CadenaEntregaComponent,
        CadenaEntregaDialogComponent,
        CadenaEntregaPopupComponent,
        CadenaEntregaDeleteDialogComponent,
        CadenaEntregaDeletePopupComponent,
    ],
    providers: [
        CadenaEntregaService,
        CadenaEntregaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeCadenaEntregaModule {}
