import { CMS_PATH } from './../../app.constants';
import { DiaEntregaComponent } from './dia-entrega.component';
import { DiaEntregaDeletePopupComponent } from './dia-entrega-delete-dialog.component';
import { DiaEntregaDetailComponent } from './dia-entrega-detail.component';
import { DiaEntregaPopupComponent } from './dia-entrega-dialog.component';
import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

export const diaEntregaRoute: Routes = [
    {
        path: CMS_PATH + '/dia-entrega',
        component: DiaEntregaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DiaEntregas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: CMS_PATH + '/dia-entrega/:id',
        component: DiaEntregaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DiaEntregas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const diaEntregaPopupRoute: Routes = [
    {
        path: 'dia-entrega-new',
        component: DiaEntregaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DiaEntregas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dia-entrega/:id/edit',
        component: DiaEntregaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DiaEntregas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dia-entrega/:id/delete',
        component: DiaEntregaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DiaEntregas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
