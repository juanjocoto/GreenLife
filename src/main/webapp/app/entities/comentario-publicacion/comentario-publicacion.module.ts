import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
    ComentarioPublicacionComponent,
    ComentarioPublicacionDeleteDialogComponent,
    ComentarioPublicacionDeletePopupComponent,
    ComentarioPublicacionDetailComponent,
    ComentarioPublicacionDialogComponent,
    ComentarioPublicacionPopupComponent,
    ComentarioPublicacionPopupService,
    ComentarioPublicacionService,
    comentarioPublicacionPopupRoute,
    comentarioPublicacionRoute,
} from './';

import { GreenlifeSharedModule } from '../../shared';
import { RouterModule } from '@angular/router';
import { enviroment } from './../../enviroment';

comentarioPublicacionRoute.forEach((a) => a.path = `${enviroment.cmsPath}/${a.path}`);

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
