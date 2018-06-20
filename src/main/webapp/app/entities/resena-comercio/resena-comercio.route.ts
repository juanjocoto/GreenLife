import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ResenaComercioComponent } from './resena-comercio.component';
import { ResenaComercioDetailComponent } from './resena-comercio-detail.component';
import { ResenaComercioPopupComponent } from './resena-comercio-dialog.component';
import { ResenaComercioDeletePopupComponent } from './resena-comercio-delete-dialog.component';

export const resenaComercioRoute: Routes = [
    {
        path: 'resena-comercio',
        component: ResenaComercioComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ResenaComercios'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'resena-comercio/:id',
        component: ResenaComercioDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ResenaComercios'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const resenaComercioPopupRoute: Routes = [
    {
        path: 'resena-comercio-new',
        component: ResenaComercioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ResenaComercios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'resena-comercio/:id/edit',
        component: ResenaComercioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ResenaComercios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'resena-comercio/:id/delete',
        component: ResenaComercioDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ResenaComercios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
