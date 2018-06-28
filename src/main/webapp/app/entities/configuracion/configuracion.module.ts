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

import { GreenlifeSharedModule } from '../../shared';
import { RouterModule } from '@angular/router';
import { enviroment } from './../../enviroment';

configuracionRoute.forEach((a) => a.path = `${enviroment.cmsPath}/${a.path}`);

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
