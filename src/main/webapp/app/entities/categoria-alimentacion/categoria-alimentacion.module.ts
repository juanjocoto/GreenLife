import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenlifeSharedModule } from '../../shared';
import {
    CategoriaAlimentacionService,
    CategoriaAlimentacionPopupService,
    CategoriaAlimentacionComponent,
    CategoriaAlimentacionDetailComponent,
    CategoriaAlimentacionDialogComponent,
    CategoriaAlimentacionPopupComponent,
    CategoriaAlimentacionDeletePopupComponent,
    CategoriaAlimentacionDeleteDialogComponent,
    categoriaAlimentacionRoute,
    categoriaAlimentacionPopupRoute,
} from './';

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
