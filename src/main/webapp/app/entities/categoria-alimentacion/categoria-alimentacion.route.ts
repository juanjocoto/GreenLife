import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CategoriaAlimentacionComponent } from './categoria-alimentacion.component';
import { CategoriaAlimentacionDetailComponent } from './categoria-alimentacion-detail.component';
import { CategoriaAlimentacionPopupComponent } from './categoria-alimentacion-dialog.component';
import { CategoriaAlimentacionDeletePopupComponent } from './categoria-alimentacion-delete-dialog.component';

export const categoriaAlimentacionRoute: Routes = [
    {
        path: 'categoria-alimentacion',
        component: CategoriaAlimentacionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CategoriaAlimentacions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'categoria-alimentacion/:id',
        component: CategoriaAlimentacionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CategoriaAlimentacions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const categoriaAlimentacionPopupRoute: Routes = [
    {
        path: 'categoria-alimentacion-new',
        component: CategoriaAlimentacionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CategoriaAlimentacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'categoria-alimentacion/:id/edit',
        component: CategoriaAlimentacionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CategoriaAlimentacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'categoria-alimentacion/:id/delete',
        component: CategoriaAlimentacionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CategoriaAlimentacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
