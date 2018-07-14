import { CMS_PATH } from './../../app.constants';
import { PagoComponent } from './pago.component';
import { PagoDeletePopupComponent } from './pago-delete-dialog.component';
import { PagoDetailComponent } from './pago-detail.component';
import { PagoPopupComponent } from './pago-dialog.component';
import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

export const pagoRoute: Routes = [
    {
        path: CMS_PATH + '/pago',
        component: PagoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pagos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: CMS_PATH + '/pago/:id',
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
