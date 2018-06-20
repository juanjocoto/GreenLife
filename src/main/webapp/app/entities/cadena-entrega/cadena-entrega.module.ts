import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenlifeSharedModule } from '../../shared';
import {
    CadenaEntregaService,
    CadenaEntregaPopupService,
    CadenaEntregaComponent,
    CadenaEntregaDetailComponent,
    CadenaEntregaDialogComponent,
    CadenaEntregaPopupComponent,
    CadenaEntregaDeletePopupComponent,
    CadenaEntregaDeleteDialogComponent,
    cadenaEntregaRoute,
    cadenaEntregaPopupRoute,
} from './';

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
