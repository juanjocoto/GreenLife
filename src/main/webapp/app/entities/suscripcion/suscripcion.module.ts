import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
    SuscripcionComponent,
    SuscripcionDeleteDialogComponent,
    SuscripcionDeletePopupComponent,
    SuscripcionDetailComponent,
    SuscripcionDialogComponent,
    SuscripcionPopupComponent,
    SuscripcionPopupService,
    SuscripcionService,
    suscripcionPopupRoute,
    suscripcionRoute,
} from './';

import { CMS_PATH } from '../../app.constants';
import { GreenlifeSharedModule } from '../../shared';
import { RouterModule } from '@angular/router';

const ENTITY_STATES = [
    ...suscripcionRoute,
    ...suscripcionPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SuscripcionComponent,
        SuscripcionDetailComponent,
        SuscripcionDialogComponent,
        SuscripcionDeleteDialogComponent,
        SuscripcionPopupComponent,
        SuscripcionDeletePopupComponent,
    ],
    entryComponents: [
        SuscripcionComponent,
        SuscripcionDialogComponent,
        SuscripcionPopupComponent,
        SuscripcionDeleteDialogComponent,
        SuscripcionDeletePopupComponent,
    ],
    providers: [
        SuscripcionService,
        SuscripcionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeSuscripcionModule {}
