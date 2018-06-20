import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RolComponent } from './rol.component';
import { RolDetailComponent } from './rol-detail.component';
import { RolPopupComponent } from './rol-dialog.component';
import { RolDeletePopupComponent } from './rol-delete-dialog.component';

export const rolRoute: Routes = [
    {
        path: 'rol',
        component: RolComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rols'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'rol/:id',
        component: RolDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rols'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rolPopupRoute: Routes = [
    {
        path: 'rol-new',
        component: RolPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rols'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rol/:id/edit',
        component: RolPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rols'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rol/:id/delete',
        component: RolDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rols'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
