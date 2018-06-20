import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenlifeSharedModule } from '../../shared';
import {
    ResenaComercioService,
    ResenaComercioPopupService,
    ResenaComercioComponent,
    ResenaComercioDetailComponent,
    ResenaComercioDialogComponent,
    ResenaComercioPopupComponent,
    ResenaComercioDeletePopupComponent,
    ResenaComercioDeleteDialogComponent,
    resenaComercioRoute,
    resenaComercioPopupRoute,
} from './';

const ENTITY_STATES = [
    ...resenaComercioRoute,
    ...resenaComercioPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ResenaComercioComponent,
        ResenaComercioDetailComponent,
        ResenaComercioDialogComponent,
        ResenaComercioDeleteDialogComponent,
        ResenaComercioPopupComponent,
        ResenaComercioDeletePopupComponent,
    ],
    entryComponents: [
        ResenaComercioComponent,
        ResenaComercioDialogComponent,
        ResenaComercioPopupComponent,
        ResenaComercioDeleteDialogComponent,
        ResenaComercioDeletePopupComponent,
    ],
    providers: [
        ResenaComercioService,
        ResenaComercioPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeResenaComercioModule {}
