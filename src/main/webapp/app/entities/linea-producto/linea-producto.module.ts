import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenlifeSharedModule } from '../../shared';
import {
    LineaProductoService,
    LineaProductoPopupService,
    LineaProductoComponent,
    LineaProductoDetailComponent,
    LineaProductoDialogComponent,
    LineaProductoPopupComponent,
    LineaProductoDeletePopupComponent,
    LineaProductoDeleteDialogComponent,
    lineaProductoRoute,
    lineaProductoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...lineaProductoRoute,
    ...lineaProductoPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LineaProductoComponent,
        LineaProductoDetailComponent,
        LineaProductoDialogComponent,
        LineaProductoDeleteDialogComponent,
        LineaProductoPopupComponent,
        LineaProductoDeletePopupComponent,
    ],
    entryComponents: [
        LineaProductoComponent,
        LineaProductoDialogComponent,
        LineaProductoPopupComponent,
        LineaProductoDeleteDialogComponent,
        LineaProductoDeletePopupComponent,
    ],
    providers: [
        LineaProductoService,
        LineaProductoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeLineaProductoModule {}
