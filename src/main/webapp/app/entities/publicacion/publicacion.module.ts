import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
    PublicacionComponent,
    PublicacionDeleteDialogComponent,
    PublicacionDeletePopupComponent,
    PublicacionDetailComponent,
    PublicacionDialogComponent,
    PublicacionPopupComponent,
    PublicacionPopupService,
    PublicacionService,
    publicacionPopupRoute,
    publicacionRoute,
} from './';

import { CMS_PATH } from '../../app.constants';
import { GreenlifeSharedModule } from '../../shared';
import { RouterModule } from '@angular/router';

publicacionRoute.forEach((a) => a.path = `${CMS_PATH}/${a.path}`);

const ENTITY_STATES = [
    ...publicacionRoute,
    ...publicacionPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PublicacionComponent,
        PublicacionDetailComponent,
        PublicacionDialogComponent,
        PublicacionDeleteDialogComponent,
        PublicacionPopupComponent,
        PublicacionDeletePopupComponent,
    ],
    entryComponents: [
        PublicacionComponent,
        PublicacionDialogComponent,
        PublicacionPopupComponent,
        PublicacionDeleteDialogComponent,
        PublicacionDeletePopupComponent,
    ],
    providers: [
        PublicacionService,
        PublicacionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifePublicacionModule {}
