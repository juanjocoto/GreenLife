import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
    EventoComponent,
    EventoDeleteDialogComponent,
    EventoDeletePopupComponent,
    EventoDetailComponent,
    EventoDialogComponent,
    EventoPopupComponent,
    EventoPopupService,
    EventoService,
    eventoPopupRoute,
    eventoRoute,
} from './';

import { CMS_PATH } from '../../app.constants';
import { GreenlifeSharedModule } from '../../shared';
import { RouterModule } from '@angular/router';

const ENTITY_STATES = [
    ...eventoRoute,
    ...eventoPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EventoComponent,
        EventoDetailComponent,
        EventoDialogComponent,
        EventoDeleteDialogComponent,
        EventoPopupComponent,
        EventoDeletePopupComponent,
    ],
    entryComponents: [
        EventoComponent,
        EventoDialogComponent,
        EventoPopupComponent,
        EventoDeleteDialogComponent,
        EventoDeletePopupComponent,
    ],
    providers: [
        EventoService,
        EventoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeEventoModule {}
