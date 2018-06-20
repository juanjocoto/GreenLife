import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CentroAcopioComponent } from './centro-acopio.component';
import { CentroAcopioDetailComponent } from './centro-acopio-detail.component';
import { CentroAcopioPopupComponent } from './centro-acopio-dialog.component';
import { CentroAcopioDeletePopupComponent } from './centro-acopio-delete-dialog.component';

export const centroAcopioRoute: Routes = [
    {
        path: 'centro-acopio',
        component: CentroAcopioComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CentroAcopios'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'centro-acopio/:id',
        component: CentroAcopioDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CentroAcopios'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const centroAcopioPopupRoute: Routes = [
    {
        path: 'centro-acopio-new',
        component: CentroAcopioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CentroAcopios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'centro-acopio/:id/edit',
        component: CentroAcopioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CentroAcopios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'centro-acopio/:id/delete',
        component: CentroAcopioDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CentroAcopios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
