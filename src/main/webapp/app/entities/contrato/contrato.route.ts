import { CMS_PATH } from './../../app.constants';
import { ContratoComponent } from './contrato.component';
import { ContratoDeletePopupComponent } from './contrato-delete-dialog.component';
import { ContratoDetailComponent } from './contrato-detail.component';
import { ContratoPopupComponent } from './contrato-dialog.component';
import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

export const contratoRoute: Routes = [
    {
        path: CMS_PATH + '/contrato',
        component: ContratoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Contratoes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: CMS_PATH + '/contrato/:id',
        component: ContratoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Contratoes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const contratoPopupRoute: Routes = [
    {
        path: 'contrato-new',
        component: ContratoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Contratoes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'contrato/:id/edit',
        component: ContratoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Contratoes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'contrato/:id/delete',
        component: ContratoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Contratoes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
