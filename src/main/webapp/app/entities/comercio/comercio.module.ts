import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenlifeSharedModule } from '../../shared';
import {
    ComercioService,
    ComercioPopupService,
    ComercioComponent,
    ComercioDetailComponent,
    ComercioDialogComponent,
    ComercioPopupComponent,
    ComercioDeletePopupComponent,
    ComercioDeleteDialogComponent,
    comercioRoute,
    comercioPopupRoute,
} from './';

const ENTITY_STATES = [
    ...comercioRoute,
    ...comercioPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ComercioComponent,
        ComercioDetailComponent,
        ComercioDialogComponent,
        ComercioDeleteDialogComponent,
        ComercioPopupComponent,
        ComercioDeletePopupComponent,
    ],
    entryComponents: [
        ComercioComponent,
        ComercioDialogComponent,
        ComercioPopupComponent,
        ComercioDeleteDialogComponent,
        ComercioDeletePopupComponent,
    ],
    providers: [
        ComercioService,
        ComercioPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeComercioModule {}
