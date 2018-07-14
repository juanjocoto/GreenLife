import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
    PagoComponent,
    PagoDeleteDialogComponent,
    PagoDeletePopupComponent,
    PagoDetailComponent,
    PagoDialogComponent,
    PagoPopupComponent,
    PagoPopupService,
    PagoService,
    pagoPopupRoute,
    pagoRoute,
} from './';

import { CMS_PATH } from '../../app.constants';
import { GreenlifeSharedModule } from '../../shared';
import { RouterModule } from '@angular/router';

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
