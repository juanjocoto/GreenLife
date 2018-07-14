import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
    DiaEntregaComponent,
    DiaEntregaDeleteDialogComponent,
    DiaEntregaDeletePopupComponent,
    DiaEntregaDetailComponent,
    DiaEntregaDialogComponent,
    DiaEntregaPopupComponent,
    DiaEntregaPopupService,
    DiaEntregaService,
    diaEntregaPopupRoute,
    diaEntregaRoute,
} from './';

import { CMS_PATH } from '../../app.constants';
import { GreenlifeSharedModule } from '../../shared';
import { RouterModule } from '@angular/router';

const ENTITY_STATES = [
    ...diaEntregaRoute,
    ...diaEntregaPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DiaEntregaComponent,
        DiaEntregaDetailComponent,
        DiaEntregaDialogComponent,
        DiaEntregaDeleteDialogComponent,
        DiaEntregaPopupComponent,
        DiaEntregaDeletePopupComponent,
    ],
    entryComponents: [
        DiaEntregaComponent,
        DiaEntregaDialogComponent,
        DiaEntregaPopupComponent,
        DiaEntregaDeleteDialogComponent,
        DiaEntregaDeletePopupComponent,
    ],
    providers: [
        DiaEntregaService,
        DiaEntregaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeDiaEntregaModule {}
