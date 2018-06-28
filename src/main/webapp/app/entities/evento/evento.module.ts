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

import { GreenlifeSharedModule } from '../../shared';
import { RouterModule } from '@angular/router';
import { enviroment } from './../../enviroment';

eventoRoute.forEach((a) => a.path = `${enviroment.cmsPath}/${a.path}`);

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
