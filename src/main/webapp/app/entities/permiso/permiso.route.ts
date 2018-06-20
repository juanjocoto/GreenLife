import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PermisoComponent } from './permiso.component';
import { PermisoDetailComponent } from './permiso-detail.component';
import { PermisoPopupComponent } from './permiso-dialog.component';
import { PermisoDeletePopupComponent } from './permiso-delete-dialog.component';

export const permisoRoute: Routes = [
    {
        path: 'permiso',
        component: PermisoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Permisos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'permiso/:id',
        component: PermisoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Permisos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const permisoPopupRoute: Routes = [
    {
        path: 'permiso-new',
        component: PermisoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Permisos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'permiso/:id/edit',
        component: PermisoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Permisos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'permiso/:id/delete',
        component: PermisoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Permisos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
