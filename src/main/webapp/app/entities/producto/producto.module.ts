import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenlifeSharedModule } from '../../shared';
import {
    ProductoService,
    ProductoPopupService,
    ProductoComponent,
    ProductoDetailComponent,
    ProductoDialogComponent,
    ProductoPopupComponent,
    ProductoDeletePopupComponent,
    ProductoDeleteDialogComponent,
    productoRoute,
    productoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...productoRoute,
    ...productoPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProductoComponent,
        ProductoDetailComponent,
        ProductoDialogComponent,
        ProductoDeleteDialogComponent,
        ProductoPopupComponent,
        ProductoDeletePopupComponent,
    ],
    entryComponents: [
        ProductoComponent,
        ProductoDialogComponent,
        ProductoPopupComponent,
        ProductoDeleteDialogComponent,
        ProductoDeletePopupComponent,
    ],
    providers: [
        ProductoService,
        ProductoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeProductoModule {}
