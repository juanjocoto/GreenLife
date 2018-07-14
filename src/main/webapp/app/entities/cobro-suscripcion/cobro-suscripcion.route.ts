import { CMS_PATH } from './../../app.constants';
import { CobroSuscripcionComponent } from './cobro-suscripcion.component';
import { CobroSuscripcionDeletePopupComponent } from './cobro-suscripcion-delete-dialog.component';
import { CobroSuscripcionDetailComponent } from './cobro-suscripcion-detail.component';
import { CobroSuscripcionPopupComponent } from './cobro-suscripcion-dialog.component';
import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

export const cobroSuscripcionRoute: Routes = [
    {
        path: CMS_PATH + '/cobro-suscripcion',
        component: CobroSuscripcionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CobroSuscripcions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: CMS_PATH + '/cobro-suscripcion/:id',
        component: CobroSuscripcionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CobroSuscripcions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cobroSuscripcionPopupRoute: Routes = [
    {
        path: 'cobro-suscripcion-new',
        component: CobroSuscripcionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CobroSuscripcions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cobro-suscripcion/:id/edit',
        component: CobroSuscripcionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CobroSuscripcions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cobro-suscripcion/:id/delete',
        component: CobroSuscripcionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CobroSuscripcions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
