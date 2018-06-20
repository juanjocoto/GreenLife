import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenlifeSharedModule } from '../../shared';
import {
    CentroAcopioService,
    CentroAcopioPopupService,
    CentroAcopioComponent,
    CentroAcopioDetailComponent,
    CentroAcopioDialogComponent,
    CentroAcopioPopupComponent,
    CentroAcopioDeletePopupComponent,
    CentroAcopioDeleteDialogComponent,
    centroAcopioRoute,
    centroAcopioPopupRoute,
} from './';

const ENTITY_STATES = [
    ...centroAcopioRoute,
    ...centroAcopioPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CentroAcopioComponent,
        CentroAcopioDetailComponent,
        CentroAcopioDialogComponent,
        CentroAcopioDeleteDialogComponent,
        CentroAcopioPopupComponent,
        CentroAcopioDeletePopupComponent,
    ],
    entryComponents: [
        CentroAcopioComponent,
        CentroAcopioDialogComponent,
        CentroAcopioPopupComponent,
        CentroAcopioDeleteDialogComponent,
        CentroAcopioDeletePopupComponent,
    ],
    providers: [
        CentroAcopioService,
        CentroAcopioPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeCentroAcopioModule {}
