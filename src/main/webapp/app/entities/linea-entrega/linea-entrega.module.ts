import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenlifeSharedModule } from '../../shared';
import {
    LineaEntregaService,
    LineaEntregaPopupService,
    LineaEntregaComponent,
    LineaEntregaDetailComponent,
    LineaEntregaDialogComponent,
    LineaEntregaPopupComponent,
    LineaEntregaDeletePopupComponent,
    LineaEntregaDeleteDialogComponent,
    lineaEntregaRoute,
    lineaEntregaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...lineaEntregaRoute,
    ...lineaEntregaPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LineaEntregaComponent,
        LineaEntregaDetailComponent,
        LineaEntregaDialogComponent,
        LineaEntregaDeleteDialogComponent,
        LineaEntregaPopupComponent,
        LineaEntregaDeletePopupComponent,
    ],
    entryComponents: [
        LineaEntregaComponent,
        LineaEntregaDialogComponent,
        LineaEntregaPopupComponent,
        LineaEntregaDeleteDialogComponent,
        LineaEntregaDeletePopupComponent,
    ],
    providers: [
        LineaEntregaService,
        LineaEntregaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeLineaEntregaModule {}
