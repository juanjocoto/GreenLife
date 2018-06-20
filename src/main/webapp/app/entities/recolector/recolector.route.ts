import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RecolectorComponent } from './recolector.component';
import { RecolectorDetailComponent } from './recolector-detail.component';
import { RecolectorPopupComponent } from './recolector-dialog.component';
import { RecolectorDeletePopupComponent } from './recolector-delete-dialog.component';

export const recolectorRoute: Routes = [
    {
        path: 'recolector',
        component: RecolectorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Recolectors'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'recolector/:id',
        component: RecolectorDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Recolectors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const recolectorPopupRoute: Routes = [
    {
        path: 'recolector-new',
        component: RecolectorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Recolectors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'recolector/:id/edit',
        component: RecolectorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Recolectors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'recolector/:id/delete',
        component: RecolectorDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Recolectors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
