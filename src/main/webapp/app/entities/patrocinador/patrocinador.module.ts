import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
    PatrocinadorComponent,
    PatrocinadorDeleteDialogComponent,
    PatrocinadorDeletePopupComponent,
    PatrocinadorDetailComponent,
    PatrocinadorDialogComponent,
    PatrocinadorPopupComponent,
    PatrocinadorPopupService,
    PatrocinadorService,
    patrocinadorPopupRoute,
    patrocinadorRoute,
} from './';

import { CMS_PATH } from '../../app.constants';
import { GreenlifeSharedModule } from '../../shared';
import { RouterModule } from '@angular/router';

patrocinadorRoute.forEach((a) => a.path = `${CMS_PATH}/${a.path}`);

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
