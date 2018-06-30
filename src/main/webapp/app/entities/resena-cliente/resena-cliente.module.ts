import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
    ResenaClienteComponent,
    ResenaClienteDeleteDialogComponent,
    ResenaClienteDeletePopupComponent,
    ResenaClienteDetailComponent,
    ResenaClienteDialogComponent,
    ResenaClientePopupComponent,
    ResenaClientePopupService,
    ResenaClienteService,
    resenaClientePopupRoute,
    resenaClienteRoute,
} from './';

import { CMS_PATH } from '../../app.constants';
import { GreenlifeSharedModule } from '../../shared';
import { RouterModule } from '@angular/router';

resenaClienteRoute.forEach((a) => a.path = `${CMS_PATH}/${a.path}`);

const ENTITY_STATES = [
    ...resenaClienteRoute,
    ...resenaClientePopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ResenaClienteComponent,
        ResenaClienteDetailComponent,
        ResenaClienteDialogComponent,
        ResenaClienteDeleteDialogComponent,
        ResenaClientePopupComponent,
        ResenaClienteDeletePopupComponent,
    ],
    entryComponents: [
        ResenaClienteComponent,
        ResenaClienteDialogComponent,
        ResenaClientePopupComponent,
        ResenaClienteDeleteDialogComponent,
        ResenaClienteDeletePopupComponent,
    ],
    providers: [
        ResenaClienteService,
        ResenaClientePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeResenaClienteModule {}
