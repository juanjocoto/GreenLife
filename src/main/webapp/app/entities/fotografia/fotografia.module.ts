import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenlifeSharedModule } from '../../shared';
import {
    FotografiaService,
    FotografiaPopupService,
    FotografiaComponent,
    FotografiaDetailComponent,
    FotografiaDialogComponent,
    FotografiaPopupComponent,
    FotografiaDeletePopupComponent,
    FotografiaDeleteDialogComponent,
    fotografiaRoute,
    fotografiaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...fotografiaRoute,
    ...fotografiaPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FotografiaComponent,
        FotografiaDetailComponent,
        FotografiaDialogComponent,
        FotografiaDeleteDialogComponent,
        FotografiaPopupComponent,
        FotografiaDeletePopupComponent,
    ],
    entryComponents: [
        FotografiaComponent,
        FotografiaDialogComponent,
        FotografiaPopupComponent,
        FotografiaDeleteDialogComponent,
        FotografiaDeletePopupComponent,
    ],
    providers: [
        FotografiaService,
        FotografiaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeFotografiaModule {}
