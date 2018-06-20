import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SolicitudSuscripcionComponent } from './solicitud-suscripcion.component';
import { SolicitudSuscripcionDetailComponent } from './solicitud-suscripcion-detail.component';
import { SolicitudSuscripcionPopupComponent } from './solicitud-suscripcion-dialog.component';
import { SolicitudSuscripcionDeletePopupComponent } from './solicitud-suscripcion-delete-dialog.component';

export const solicitudSuscripcionRoute: Routes = [
    {
        path: 'solicitud-suscripcion',
        component: SolicitudSuscripcionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SolicitudSuscripcions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'solicitud-suscripcion/:id',
        component: SolicitudSuscripcionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SolicitudSuscripcions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const solicitudSuscripcionPopupRoute: Routes = [
    {
        path: 'solicitud-suscripcion-new',
        component: SolicitudSuscripcionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SolicitudSuscripcions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'solicitud-suscripcion/:id/edit',
        component: SolicitudSuscripcionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SolicitudSuscripcions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'solicitud-suscripcion/:id/delete',
        component: SolicitudSuscripcionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SolicitudSuscripcions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
