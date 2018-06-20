import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PagoComponent } from './pago.component';
import { PagoDetailComponent } from './pago-detail.component';
import { PagoPopupComponent } from './pago-dialog.component';
import { PagoDeletePopupComponent } from './pago-delete-dialog.component';

export const pagoRoute: Routes = [
    {
        path: 'pago',
        component: PagoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pagos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pago/:id',
        component: PagoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pagos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pagoPopupRoute: Routes = [
    {
        path: 'pago-new',
        component: PagoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pagos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pago/:id/edit',
        component: PagoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pagos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pago/:id/delete',
        component: PagoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pagos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
