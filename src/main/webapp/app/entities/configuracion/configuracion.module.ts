import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
    ConfiguracionComponent,
    ConfiguracionDeleteDialogComponent,
    ConfiguracionDeletePopupComponent,
    ConfiguracionDetailComponent,
    ConfiguracionDialogComponent,
    ConfiguracionPopupComponent,
    ConfiguracionPopupService,
    ConfiguracionService,
    configuracionPopupRoute,
    configuracionRoute,
} from './';

import { CMS_PATH } from '../../app.constants';
import { GreenlifeSharedModule } from '../../shared';
import { RouterModule } from '@angular/router';

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
