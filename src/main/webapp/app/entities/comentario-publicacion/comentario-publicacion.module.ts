import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenlifeSharedModule } from '../../shared';
import {
    ComentarioPublicacionService,
    ComentarioPublicacionPopupService,
    ComentarioPublicacionComponent,
    ComentarioPublicacionDetailComponent,
    ComentarioPublicacionDialogComponent,
    ComentarioPublicacionPopupComponent,
    ComentarioPublicacionDeletePopupComponent,
    ComentarioPublicacionDeleteDialogComponent,
    comentarioPublicacionRoute,
    comentarioPublicacionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...comentarioPublicacionRoute,
    ...comentarioPublicacionPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ComentarioPublicacionComponent,
        ComentarioPublicacionDetailComponent,
        ComentarioPublicacionDialogComponent,
        ComentarioPublicacionDeleteDialogComponent,
        ComentarioPublicacionPopupComponent,
        ComentarioPublicacionDeletePopupComponent,
    ],
    entryComponents: [
        ComentarioPublicacionComponent,
        ComentarioPublicacionDialogComponent,
        ComentarioPublicacionPopupComponent,
        ComentarioPublicacionDeleteDialogComponent,
        ComentarioPublicacionDeletePopupComponent,
    ],
    providers: [
        ComentarioPublicacionService,
        ComentarioPublicacionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeComentarioPublicacionModule {}
