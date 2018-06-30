import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
    EtiquetaComponent,
    EtiquetaDeleteDialogComponent,
    EtiquetaDeletePopupComponent,
    EtiquetaDetailComponent,
    EtiquetaDialogComponent,
    EtiquetaPopupComponent,
    EtiquetaPopupService,
    EtiquetaService,
    etiquetaPopupRoute,
    etiquetaRoute,
} from './';

import { CMS_PATH } from '../../app.constants';
import { GreenlifeSharedModule } from '../../shared';
import { RouterModule } from '@angular/router';

etiquetaRoute.forEach((a) => a.path = `${CMS_PATH}/${a.path}`);

const ENTITY_STATES = [
    ...etiquetaRoute,
    ...etiquetaPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EtiquetaComponent,
        EtiquetaDetailComponent,
        EtiquetaDialogComponent,
        EtiquetaDeleteDialogComponent,
        EtiquetaPopupComponent,
        EtiquetaDeletePopupComponent,
    ],
    entryComponents: [
        EtiquetaComponent,
        EtiquetaDialogComponent,
        EtiquetaPopupComponent,
        EtiquetaDeleteDialogComponent,
        EtiquetaDeletePopupComponent,
    ],
    providers: [
        EtiquetaService,
        EtiquetaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeEtiquetaModule {}
