import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenlifeSharedModule } from '../../shared';
import {
    PedidoService,
    PedidoPopupService,
    PedidoComponent,
    PedidoDetailComponent,
    PedidoDialogComponent,
    PedidoPopupComponent,
    PedidoDeletePopupComponent,
    PedidoDeleteDialogComponent,
    pedidoRoute,
    pedidoPopupRoute,
} from './';

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
