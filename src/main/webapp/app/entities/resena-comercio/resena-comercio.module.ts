import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
    ResenaComercioComponent,
    ResenaComercioDeleteDialogComponent,
    ResenaComercioDeletePopupComponent,
    ResenaComercioDetailComponent,
    ResenaComercioDialogComponent,
    ResenaComercioPopupComponent,
    ResenaComercioPopupService,
    ResenaComercioService,
    resenaComercioPopupRoute,
    resenaComercioRoute,
} from './';

import { CMS_PATH } from '../../app.constants';
import { GreenlifeSharedModule } from '../../shared';
import { RouterModule } from '@angular/router';

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
