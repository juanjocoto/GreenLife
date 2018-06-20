import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { OrdenRecoleccionComponent } from './orden-recoleccion.component';
import { OrdenRecoleccionDetailComponent } from './orden-recoleccion-detail.component';
import { OrdenRecoleccionPopupComponent } from './orden-recoleccion-dialog.component';
import { OrdenRecoleccionDeletePopupComponent } from './orden-recoleccion-delete-dialog.component';

export const ordenRecoleccionRoute: Routes = [
    {
        path: 'orden-recoleccion',
        component: OrdenRecoleccionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrdenRecoleccions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'orden-recoleccion/:id',
        component: OrdenRecoleccionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrdenRecoleccions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ordenRecoleccionPopupRoute: Routes = [
    {
        path: 'orden-recoleccion-new',
        component: OrdenRecoleccionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrdenRecoleccions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'orden-recoleccion/:id/edit',
        component: OrdenRecoleccionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrdenRecoleccions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'orden-recoleccion/:id/delete',
        component: OrdenRecoleccionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrdenRecoleccions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
