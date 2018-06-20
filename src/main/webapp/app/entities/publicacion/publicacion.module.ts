import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenlifeSharedModule } from '../../shared';
import {
    PublicacionService,
    PublicacionPopupService,
    PublicacionComponent,
    PublicacionDetailComponent,
    PublicacionDialogComponent,
    PublicacionPopupComponent,
    PublicacionDeletePopupComponent,
    PublicacionDeleteDialogComponent,
    publicacionRoute,
    publicacionPopupRoute,
} from './';

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
