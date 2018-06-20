import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SolicitudPatrocinioComponent } from './solicitud-patrocinio.component';
import { SolicitudPatrocinioDetailComponent } from './solicitud-patrocinio-detail.component';
import { SolicitudPatrocinioPopupComponent } from './solicitud-patrocinio-dialog.component';
import { SolicitudPatrocinioDeletePopupComponent } from './solicitud-patrocinio-delete-dialog.component';

export const solicitudPatrocinioRoute: Routes = [
    {
        path: 'solicitud-patrocinio',
        component: SolicitudPatrocinioComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SolicitudPatrocinios'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'solicitud-patrocinio/:id',
        component: SolicitudPatrocinioDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SolicitudPatrocinios'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const solicitudPatrocinioPopupRoute: Routes = [
    {
        path: 'solicitud-patrocinio-new',
        component: SolicitudPatrocinioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SolicitudPatrocinios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'solicitud-patrocinio/:id/edit',
        component: SolicitudPatrocinioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SolicitudPatrocinios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'solicitud-patrocinio/:id/delete',
        component: SolicitudPatrocinioDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SolicitudPatrocinios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
