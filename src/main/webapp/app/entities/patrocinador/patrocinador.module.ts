import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenlifeSharedModule } from '../../shared';
import {
    PatrocinadorService,
    PatrocinadorPopupService,
    PatrocinadorComponent,
    PatrocinadorDetailComponent,
    PatrocinadorDialogComponent,
    PatrocinadorPopupComponent,
    PatrocinadorDeletePopupComponent,
    PatrocinadorDeleteDialogComponent,
    patrocinadorRoute,
    patrocinadorPopupRoute,
} from './';

const ENTITY_STATES = [
    ...patrocinadorRoute,
    ...patrocinadorPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PatrocinadorComponent,
        PatrocinadorDetailComponent,
        PatrocinadorDialogComponent,
        PatrocinadorDeleteDialogComponent,
        PatrocinadorPopupComponent,
        PatrocinadorDeletePopupComponent,
    ],
    entryComponents: [
        PatrocinadorComponent,
        PatrocinadorDialogComponent,
        PatrocinadorPopupComponent,
        PatrocinadorDeleteDialogComponent,
        PatrocinadorDeletePopupComponent,
    ],
    providers: [
        PatrocinadorService,
        PatrocinadorPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifePatrocinadorModule {}
