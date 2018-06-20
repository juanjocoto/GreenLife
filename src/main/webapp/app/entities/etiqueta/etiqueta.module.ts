import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenlifeSharedModule } from '../../shared';
import {
    EtiquetaService,
    EtiquetaPopupService,
    EtiquetaComponent,
    EtiquetaDetailComponent,
    EtiquetaDialogComponent,
    EtiquetaPopupComponent,
    EtiquetaDeletePopupComponent,
    EtiquetaDeleteDialogComponent,
    etiquetaRoute,
    etiquetaPopupRoute,
} from './';

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
