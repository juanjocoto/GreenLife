import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
    ContratoComponent,
    ContratoDeleteDialogComponent,
    ContratoDeletePopupComponent,
    ContratoDetailComponent,
    ContratoDialogComponent,
    ContratoPopupComponent,
    ContratoPopupService,
    ContratoService,
    contratoPopupRoute,
    contratoRoute,
} from './';

import { GreenlifeSharedModule } from '../../shared';
import { RouterModule } from '@angular/router';
import { enviroment } from './../../enviroment';

contratoRoute.forEach((a) => a.path = `${enviroment.cmsPath}/${a.path}`);

const ENTITY_STATES = [
    ...contratoRoute,
    ...contratoPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ContratoComponent,
        ContratoDetailComponent,
        ContratoDialogComponent,
        ContratoDeleteDialogComponent,
        ContratoPopupComponent,
        ContratoDeletePopupComponent,
    ],
    entryComponents: [
        ContratoComponent,
        ContratoDialogComponent,
        ContratoPopupComponent,
        ContratoDeleteDialogComponent,
        ContratoDeletePopupComponent,
    ],
    providers: [
        ContratoService,
        ContratoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeContratoModule {}
