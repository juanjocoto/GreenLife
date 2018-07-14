import { CMS_PATH } from './../../app.constants';
import { CadenaEntregaComponent } from './cadena-entrega.component';
import { CadenaEntregaDeletePopupComponent } from './cadena-entrega-delete-dialog.component';
import { CadenaEntregaDetailComponent } from './cadena-entrega-detail.component';
import { CadenaEntregaPopupComponent } from './cadena-entrega-dialog.component';
import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

export const cadenaEntregaRoute: Routes = [
    {
        path: CMS_PATH + '/cadena-entrega',
        component: CadenaEntregaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CadenaEntregas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: CMS_PATH + '/cadena-entrega/:id',
        component: CadenaEntregaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CadenaEntregas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cadenaEntregaPopupRoute: Routes = [
    {
        path: 'cadena-entrega-new',
        component: CadenaEntregaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CadenaEntregas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cadena-entrega/:id/edit',
        component: CadenaEntregaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CadenaEntregas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cadena-entrega/:id/delete',
        component: CadenaEntregaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CadenaEntregas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
