import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ResenaClienteComponent } from './resena-cliente.component';
import { ResenaClienteDetailComponent } from './resena-cliente-detail.component';
import { ResenaClientePopupComponent } from './resena-cliente-dialog.component';
import { ResenaClienteDeletePopupComponent } from './resena-cliente-delete-dialog.component';

export const resenaClienteRoute: Routes = [
    {
        path: 'resena-cliente',
        component: ResenaClienteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ResenaClientes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'resena-cliente/:id',
        component: ResenaClienteDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ResenaClientes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const resenaClientePopupRoute: Routes = [
    {
        path: 'resena-cliente-new',
        component: ResenaClientePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ResenaClientes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'resena-cliente/:id/edit',
        component: ResenaClientePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ResenaClientes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'resena-cliente/:id/delete',
        component: ResenaClienteDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ResenaClientes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
