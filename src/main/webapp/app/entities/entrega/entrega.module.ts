import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenlifeSharedModule } from '../../shared';
import {
    EntregaService,
    EntregaPopupService,
    EntregaComponent,
    EntregaDetailComponent,
    EntregaDialogComponent,
    EntregaPopupComponent,
    EntregaDeletePopupComponent,
    EntregaDeleteDialogComponent,
    entregaRoute,
    entregaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...entregaRoute,
    ...entregaPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EntregaComponent,
        EntregaDetailComponent,
        EntregaDialogComponent,
        EntregaDeleteDialogComponent,
        EntregaPopupComponent,
        EntregaDeletePopupComponent,
    ],
    entryComponents: [
        EntregaComponent,
        EntregaDialogComponent,
        EntregaPopupComponent,
        EntregaDeleteDialogComponent,
        EntregaDeletePopupComponent,
    ],
    providers: [
        EntregaService,
        EntregaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeEntregaModule {}
