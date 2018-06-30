import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
    LineaProductoComponent,
    LineaProductoDeleteDialogComponent,
    LineaProductoDeletePopupComponent,
    LineaProductoDetailComponent,
    LineaProductoDialogComponent,
    LineaProductoPopupComponent,
    LineaProductoPopupService,
    LineaProductoService,
    lineaProductoPopupRoute,
    lineaProductoRoute,
} from './';

import { CMS_PATH } from '../../app.constants';
import { GreenlifeSharedModule } from '../../shared';
import { RouterModule } from '@angular/router';
import { lineaEntregaRoute } from './../linea-entrega/linea-entrega.route';

lineaEntregaRoute.forEach((a) => a.path = `${CMS_PATH}/${a.path}`);

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
