import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
    FotografiaComponent,
    FotografiaDeleteDialogComponent,
    FotografiaDeletePopupComponent,
    FotografiaDetailComponent,
    FotografiaDialogComponent,
    FotografiaPopupComponent,
    FotografiaPopupService,
    FotografiaService,
    fotografiaPopupRoute,
    fotografiaRoute,
} from './';

import { CMS_PATH } from '../../app.constants';
import { GreenlifeSharedModule } from '../../shared';
import { RouterModule } from '@angular/router';

fotografiaRoute.forEach((a) => a.path = `${CMS_PATH}/${a.path}`);

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
