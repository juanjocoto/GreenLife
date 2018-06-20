import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SuscripcionComponent } from './suscripcion.component';
import { SuscripcionDetailComponent } from './suscripcion-detail.component';
import { SuscripcionPopupComponent } from './suscripcion-dialog.component';
import { SuscripcionDeletePopupComponent } from './suscripcion-delete-dialog.component';

export const suscripcionRoute: Routes = [
    {
        path: 'suscripcion',
        component: SuscripcionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Suscripcions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'suscripcion/:id',
        component: SuscripcionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Suscripcions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const suscripcionPopupRoute: Routes = [
    {
        path: 'suscripcion-new',
        component: SuscripcionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Suscripcions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'suscripcion/:id/edit',
        component: SuscripcionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Suscripcions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'suscripcion/:id/delete',
        component: SuscripcionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Suscripcions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
