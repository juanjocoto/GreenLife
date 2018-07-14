import { CMS_PATH } from './../../app.constants';
import { PedidoComponent } from './pedido.component';
import { PedidoDeletePopupComponent } from './pedido-delete-dialog.component';
import { PedidoDetailComponent } from './pedido-detail.component';
import { PedidoPopupComponent } from './pedido-dialog.component';
import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

export const pedidoRoute: Routes = [
    {
        path: CMS_PATH + '/pedido',
        component: PedidoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pedidos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: CMS_PATH + '/pedido/:id',
        component: PedidoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pedidos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pedidoPopupRoute: Routes = [
    {
        path: 'pedido-new',
        component: PedidoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pedidos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pedido/:id/edit',
        component: PedidoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pedidos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pedido/:id/delete',
        component: PedidoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pedidos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
