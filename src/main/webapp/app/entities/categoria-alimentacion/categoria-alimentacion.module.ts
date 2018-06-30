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

import { CMS_PATH } from '../../app.constants';
import { GreenlifeSharedModule } from '../../shared';
import { RouterModule } from '@angular/router';

categoriaAlimentacionRoute.forEach((a) => a.path = `${CMS_PATH}/${a.path}`);

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
