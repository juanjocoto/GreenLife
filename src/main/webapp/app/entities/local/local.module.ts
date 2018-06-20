import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenlifeSharedModule } from '../../shared';
import {
    LocalService,
    LocalPopupService,
    LocalComponent,
    LocalDetailComponent,
    LocalDialogComponent,
    LocalPopupComponent,
    LocalDeletePopupComponent,
    LocalDeleteDialogComponent,
    localRoute,
    localPopupRoute,
} from './';

const ENTITY_STATES = [
    ...localRoute,
    ...localPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LocalComponent,
        LocalDetailComponent,
        LocalDialogComponent,
        LocalDeleteDialogComponent,
        LocalPopupComponent,
        LocalDeletePopupComponent,
    ],
    entryComponents: [
        LocalComponent,
        LocalDialogComponent,
        LocalPopupComponent,
        LocalDeleteDialogComponent,
        LocalDeletePopupComponent,
    ],
    providers: [
        LocalService,
        LocalPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeLocalModule {}
