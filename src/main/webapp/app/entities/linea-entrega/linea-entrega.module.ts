import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
    LineaEntregaComponent,
    LineaEntregaDeleteDialogComponent,
    LineaEntregaDeletePopupComponent,
    LineaEntregaDetailComponent,
    LineaEntregaDialogComponent,
    LineaEntregaPopupComponent,
    LineaEntregaPopupService,
    LineaEntregaService,
    lineaEntregaPopupRoute,
    lineaEntregaRoute,
} from './';

import { CMS_PATH } from '../../app.constants';
import { GreenlifeSharedModule } from '../../shared';
import { RouterModule } from '@angular/router';

lineaEntregaRoute.forEach((a) => a.path = `${CMS_PATH}/${a.path}`);

const ENTITY_STATES = [
    ...lineaEntregaRoute,
    ...lineaEntregaPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LineaEntregaComponent,
        LineaEntregaDetailComponent,
        LineaEntregaDialogComponent,
        LineaEntregaDeleteDialogComponent,
        LineaEntregaPopupComponent,
        LineaEntregaDeletePopupComponent,
    ],
    entryComponents: [
        LineaEntregaComponent,
        LineaEntregaDialogComponent,
        LineaEntregaPopupComponent,
        LineaEntregaDeleteDialogComponent,
        LineaEntregaDeletePopupComponent,
    ],
    providers: [
        LineaEntregaService,
        LineaEntregaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeLineaEntregaModule {}
