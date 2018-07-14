import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
    PedidoComponent,
    PedidoDeleteDialogComponent,
    PedidoDeletePopupComponent,
    PedidoDetailComponent,
    PedidoDialogComponent,
    PedidoPopupComponent,
    PedidoPopupService,
    PedidoService,
    pedidoPopupRoute,
    pedidoRoute,
} from './';

import { CMS_PATH } from '../../app.constants';
import { GreenlifeSharedModule } from '../../shared';
import { RouterModule } from '@angular/router';

const ENTITY_STATES = [
    ...pedidoRoute,
    ...pedidoPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PedidoComponent,
        PedidoDetailComponent,
        PedidoDialogComponent,
        PedidoDeleteDialogComponent,
        PedidoPopupComponent,
        PedidoDeletePopupComponent,
    ],
    entryComponents: [
        PedidoComponent,
        PedidoDialogComponent,
        PedidoPopupComponent,
        PedidoDeleteDialogComponent,
        PedidoDeletePopupComponent,
    ],
    providers: [
        PedidoService,
        PedidoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifePedidoModule {}
