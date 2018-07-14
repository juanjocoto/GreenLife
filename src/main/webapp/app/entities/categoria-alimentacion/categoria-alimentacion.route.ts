import { CMS_PATH } from './../../app.constants';
import { CategoriaAlimentacionComponent } from './categoria-alimentacion.component';
import { CategoriaAlimentacionDeletePopupComponent } from './categoria-alimentacion-delete-dialog.component';
import { CategoriaAlimentacionDetailComponent } from './categoria-alimentacion-detail.component';
import { CategoriaAlimentacionPopupComponent } from './categoria-alimentacion-dialog.component';
import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

export const categoriaAlimentacionRoute: Routes = [
    {
        path: CMS_PATH + '/categoria-alimentacion',
        component: CategoriaAlimentacionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CategoriaAlimentacions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: CMS_PATH + '/categoria-alimentacion/:id',
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
