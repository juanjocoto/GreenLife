import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
    CentroAcopioComponent,
    CentroAcopioDeleteDialogComponent,
    CentroAcopioDeletePopupComponent,
    CentroAcopioDetailComponent,
    CentroAcopioDialogComponent,
    CentroAcopioPopupComponent,
    CentroAcopioPopupService,
    CentroAcopioService,
    centroAcopioPopupRoute,
    centroAcopioRoute,
} from './';

import { CMS_PATH } from '../../app.constants';
import { GreenlifeSharedModule } from '../../shared';
import { RouterModule } from '@angular/router';

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
export class GreenlifeCentroAcopioModule { }
