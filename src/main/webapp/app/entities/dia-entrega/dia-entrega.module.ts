import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenlifeSharedModule } from '../../shared';
import {
    DiaEntregaService,
    DiaEntregaPopupService,
    DiaEntregaComponent,
    DiaEntregaDetailComponent,
    DiaEntregaDialogComponent,
    DiaEntregaPopupComponent,
    DiaEntregaDeletePopupComponent,
    DiaEntregaDeleteDialogComponent,
    diaEntregaRoute,
    diaEntregaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...diaEntregaRoute,
    ...diaEntregaPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DiaEntregaComponent,
        DiaEntregaDetailComponent,
        DiaEntregaDialogComponent,
        DiaEntregaDeleteDialogComponent,
        DiaEntregaPopupComponent,
        DiaEntregaDeletePopupComponent,
    ],
    entryComponents: [
        DiaEntregaComponent,
        DiaEntregaDialogComponent,
        DiaEntregaPopupComponent,
        DiaEntregaDeleteDialogComponent,
        DiaEntregaDeletePopupComponent,
    ],
    providers: [
        DiaEntregaService,
        DiaEntregaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeDiaEntregaModule {}
