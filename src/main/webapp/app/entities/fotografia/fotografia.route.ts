import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { FotografiaComponent } from './fotografia.component';
import { FotografiaDetailComponent } from './fotografia-detail.component';
import { FotografiaPopupComponent } from './fotografia-dialog.component';
import { FotografiaDeletePopupComponent } from './fotografia-delete-dialog.component';

export const fotografiaRoute: Routes = [
    {
        path: 'fotografia',
        component: FotografiaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Fotografias'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'fotografia/:id',
        component: FotografiaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Fotografias'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fotografiaPopupRoute: Routes = [
    {
        path: 'fotografia-new',
        component: FotografiaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Fotografias'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'fotografia/:id/edit',
        component: FotografiaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Fotografias'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'fotografia/:id/delete',
        component: FotografiaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Fotografias'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
