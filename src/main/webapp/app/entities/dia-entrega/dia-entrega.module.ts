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

import { GreenlifeSharedModule } from '../../shared';
import { RouterModule } from '@angular/router';
import { enviroment } from './../../enviroment';

diaEntregaRoute.forEach((a) => a.path = `${enviroment.cmsPath}/${a.path}`);

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
