import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CobroMensualidadComponent } from './cobro-mensualidad.component';
import { CobroMensualidadDetailComponent } from './cobro-mensualidad-detail.component';
import { CobroMensualidadPopupComponent } from './cobro-mensualidad-dialog.component';
import { CobroMensualidadDeletePopupComponent } from './cobro-mensualidad-delete-dialog.component';

export const cobroMensualidadRoute: Routes = [
    {
        path: 'cobro-mensualidad',
        component: CobroMensualidadComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CobroMensualidads'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cobro-mensualidad/:id',
        component: CobroMensualidadDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CobroMensualidads'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cobroMensualidadPopupRoute: Routes = [
    {
        path: 'cobro-mensualidad-new',
        component: CobroMensualidadPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CobroMensualidads'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cobro-mensualidad/:id/edit',
        component: CobroMensualidadPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CobroMensualidads'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cobro-mensualidad/:id/delete',
        component: CobroMensualidadDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CobroMensualidads'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
