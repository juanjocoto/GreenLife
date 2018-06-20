import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenlifeSharedModule } from '../../shared';
import {
    PermisoService,
    PermisoPopupService,
    PermisoComponent,
    PermisoDetailComponent,
    PermisoDialogComponent,
    PermisoPopupComponent,
    PermisoDeletePopupComponent,
    PermisoDeleteDialogComponent,
    permisoRoute,
    permisoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...permisoRoute,
    ...permisoPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PermisoComponent,
        PermisoDetailComponent,
        PermisoDialogComponent,
        PermisoDeleteDialogComponent,
        PermisoPopupComponent,
        PermisoDeletePopupComponent,
    ],
    entryComponents: [
        PermisoComponent,
        PermisoDialogComponent,
        PermisoPopupComponent,
        PermisoDeleteDialogComponent,
        PermisoDeletePopupComponent,
    ],
    providers: [
        PermisoService,
        PermisoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifePermisoModule {}
