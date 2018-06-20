import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenlifeSharedModule } from '../../shared';
import {
    ConfiguracionService,
    ConfiguracionPopupService,
    ConfiguracionComponent,
    ConfiguracionDetailComponent,
    ConfiguracionDialogComponent,
    ConfiguracionPopupComponent,
    ConfiguracionDeletePopupComponent,
    ConfiguracionDeleteDialogComponent,
    configuracionRoute,
    configuracionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...configuracionRoute,
    ...configuracionPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ConfiguracionComponent,
        ConfiguracionDetailComponent,
        ConfiguracionDialogComponent,
        ConfiguracionDeleteDialogComponent,
        ConfiguracionPopupComponent,
        ConfiguracionDeletePopupComponent,
    ],
    entryComponents: [
        ConfiguracionComponent,
        ConfiguracionDialogComponent,
        ConfiguracionPopupComponent,
        ConfiguracionDeleteDialogComponent,
        ConfiguracionDeletePopupComponent,
    ],
    providers: [
        ConfiguracionService,
        ConfiguracionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeConfiguracionModule {}
