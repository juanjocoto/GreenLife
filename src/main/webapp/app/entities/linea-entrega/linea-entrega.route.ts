import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { LineaEntregaComponent } from './linea-entrega.component';
import { LineaEntregaDetailComponent } from './linea-entrega-detail.component';
import { LineaEntregaPopupComponent } from './linea-entrega-dialog.component';
import { LineaEntregaDeletePopupComponent } from './linea-entrega-delete-dialog.component';

export const lineaEntregaRoute: Routes = [
    {
        path: 'linea-entrega',
        component: LineaEntregaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LineaEntregas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'linea-entrega/:id',
        component: LineaEntregaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LineaEntregas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const lineaEntregaPopupRoute: Routes = [
    {
        path: 'linea-entrega-new',
        component: LineaEntregaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LineaEntregas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'linea-entrega/:id/edit',
        component: LineaEntregaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LineaEntregas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'linea-entrega/:id/delete',
        component: LineaEntregaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LineaEntregas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
