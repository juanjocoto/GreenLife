import { CMS_PATH } from './../../app.constants';
import { CobroMensualidadComponent } from './cobro-mensualidad.component';
import { CobroMensualidadDeletePopupComponent } from './cobro-mensualidad-delete-dialog.component';
import { CobroMensualidadDetailComponent } from './cobro-mensualidad-detail.component';
import { CobroMensualidadPopupComponent } from './cobro-mensualidad-dialog.component';
import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

export const cobroMensualidadRoute: Routes = [
    {
        path: CMS_PATH + '/cobro-mensualidad',
        component: CobroMensualidadComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CobroMensualidads'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: CMS_PATH + '/cobro-mensualidad/:id',
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
