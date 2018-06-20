import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenlifeSharedModule } from '../../shared';
import {
    PagoService,
    PagoPopupService,
    PagoComponent,
    PagoDetailComponent,
    PagoDialogComponent,
    PagoPopupComponent,
    PagoDeletePopupComponent,
    PagoDeleteDialogComponent,
    pagoRoute,
    pagoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...pagoRoute,
    ...pagoPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PagoComponent,
        PagoDetailComponent,
        PagoDialogComponent,
        PagoDeleteDialogComponent,
        PagoPopupComponent,
        PagoDeletePopupComponent,
    ],
    entryComponents: [
        PagoComponent,
        PagoDialogComponent,
        PagoPopupComponent,
        PagoDeleteDialogComponent,
        PagoDeletePopupComponent,
    ],
    providers: [
        PagoService,
        PagoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifePagoModule {}
