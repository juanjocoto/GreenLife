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

import { GreenlifeSharedModule } from '../../shared';
import { RouterModule } from '@angular/router';
import { enviroment } from './../../enviroment';
import { lineaEntregaRoute } from './../linea-entrega/linea-entrega.route';

lineaEntregaRoute.forEach((a) => a.path = `${enviroment.cmsPath}/${a.path}`);

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
