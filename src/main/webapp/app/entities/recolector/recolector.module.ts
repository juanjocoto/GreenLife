import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenlifeSharedModule } from '../../shared';
import {
    RecolectorService,
    RecolectorPopupService,
    RecolectorComponent,
    RecolectorDetailComponent,
    RecolectorDialogComponent,
    RecolectorPopupComponent,
    RecolectorDeletePopupComponent,
    RecolectorDeleteDialogComponent,
    recolectorRoute,
    recolectorPopupRoute,
} from './';

const ENTITY_STATES = [
    ...recolectorRoute,
    ...recolectorPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RecolectorComponent,
        RecolectorDetailComponent,
        RecolectorDialogComponent,
        RecolectorDeleteDialogComponent,
        RecolectorPopupComponent,
        RecolectorDeletePopupComponent,
    ],
    entryComponents: [
        RecolectorComponent,
        RecolectorDialogComponent,
        RecolectorPopupComponent,
        RecolectorDeleteDialogComponent,
        RecolectorDeletePopupComponent,
    ],
    providers: [
        RecolectorService,
        RecolectorPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeRecolectorModule {}
