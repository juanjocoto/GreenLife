import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
    TipoContratoComponent,
    TipoContratoDeleteDialogComponent,
    TipoContratoDeletePopupComponent,
    TipoContratoDetailComponent,
    TipoContratoDialogComponent,
    TipoContratoPopupComponent,
    TipoContratoPopupService,
    TipoContratoService,
    tipoContratoPopupRoute,
    tipoContratoRoute,
} from './';

import { GreenlifeSharedModule } from '../../shared';
import { RouterModule } from '@angular/router';
import { enviroment } from './../../enviroment';

tipoContratoRoute.forEach((a) => a.path = `${enviroment.cmsPath}/${a.path}`);

const ENTITY_STATES = [
    ...tipoContratoRoute,
    ...tipoContratoPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TipoContratoComponent,
        TipoContratoDetailComponent,
        TipoContratoDialogComponent,
        TipoContratoDeleteDialogComponent,
        TipoContratoPopupComponent,
        TipoContratoDeletePopupComponent,
    ],
    entryComponents: [
        TipoContratoComponent,
        TipoContratoDialogComponent,
        TipoContratoPopupComponent,
        TipoContratoDeleteDialogComponent,
        TipoContratoDeletePopupComponent,
    ],
    providers: [
        TipoContratoService,
        TipoContratoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeTipoContratoModule {}
