import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
    ProductoComponent,
    ProductoDeleteDialogComponent,
    ProductoDeletePopupComponent,
    ProductoDetailComponent,
    ProductoDialogComponent,
    ProductoPopupComponent,
    ProductoPopupService,
    ProductoService,
    productoPopupRoute,
    productoRoute,
} from './';

import { GreenlifeSharedModule } from '../../shared';
import { RouterModule } from '@angular/router';
import { enviroment } from './../../enviroment';

productoRoute.forEach((a) => a.path = `${enviroment.cmsPath}/${a.path}`);

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
