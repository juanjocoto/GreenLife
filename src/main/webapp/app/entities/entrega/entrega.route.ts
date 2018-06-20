import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EntregaComponent } from './entrega.component';
import { EntregaDetailComponent } from './entrega-detail.component';
import { EntregaPopupComponent } from './entrega-dialog.component';
import { EntregaDeletePopupComponent } from './entrega-delete-dialog.component';

export const entregaRoute: Routes = [
    {
        path: 'entrega',
        component: EntregaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Entregas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'entrega/:id',
        component: EntregaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Entregas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const entregaPopupRoute: Routes = [
    {
        path: 'entrega-new',
        component: EntregaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Entregas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'entrega/:id/edit',
        component: EntregaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Entregas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'entrega/:id/delete',
        component: EntregaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Entregas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
