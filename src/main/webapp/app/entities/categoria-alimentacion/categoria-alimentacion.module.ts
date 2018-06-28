import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
    CategoriaAlimentacionComponent,
    CategoriaAlimentacionDeleteDialogComponent,
    CategoriaAlimentacionDeletePopupComponent,
    CategoriaAlimentacionDetailComponent,
    CategoriaAlimentacionDialogComponent,
    CategoriaAlimentacionPopupComponent,
    CategoriaAlimentacionPopupService,
    CategoriaAlimentacionService,
    categoriaAlimentacionPopupRoute,
    categoriaAlimentacionRoute,
} from './';

import { GreenlifeSharedModule } from '../../shared';
import { RouterModule } from '@angular/router';
import { enviroment } from './../../enviroment';

categoriaAlimentacionRoute.forEach((a) => a.path = `${enviroment.cmsPath}/${a.path}`);

const ENTITY_STATES = [
    ...categoriaAlimentacionRoute,
    ...categoriaAlimentacionPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CategoriaAlimentacionComponent,
        CategoriaAlimentacionDetailComponent,
        CategoriaAlimentacionDialogComponent,
        CategoriaAlimentacionDeleteDialogComponent,
        CategoriaAlimentacionPopupComponent,
        CategoriaAlimentacionDeletePopupComponent,
    ],
    entryComponents: [
        CategoriaAlimentacionComponent,
        CategoriaAlimentacionDialogComponent,
        CategoriaAlimentacionPopupComponent,
        CategoriaAlimentacionDeleteDialogComponent,
        CategoriaAlimentacionDeletePopupComponent,
    ],
    providers: [
        CategoriaAlimentacionService,
        CategoriaAlimentacionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeCategoriaAlimentacionModule {}
