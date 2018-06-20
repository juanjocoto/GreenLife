import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenlifeSharedModule } from '../../shared';
import {
    RolService,
    RolPopupService,
    RolComponent,
    RolDetailComponent,
    RolDialogComponent,
    RolPopupComponent,
    RolDeletePopupComponent,
    RolDeleteDialogComponent,
    rolRoute,
    rolPopupRoute,
} from './';

const ENTITY_STATES = [
    ...rolRoute,
    ...rolPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RolComponent,
        RolDetailComponent,
        RolDialogComponent,
        RolDeleteDialogComponent,
        RolPopupComponent,
        RolDeletePopupComponent,
    ],
    entryComponents: [
        RolComponent,
        RolDialogComponent,
        RolPopupComponent,
        RolDeleteDialogComponent,
        RolDeletePopupComponent,
    ],
    providers: [
        RolService,
        RolPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeRolModule {}
