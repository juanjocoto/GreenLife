import { CMS_PATH } from './../../app.constants';
import { Routes } from '@angular/router';
import { TipoContratoComponent } from './tipo-contrato.component';
import { TipoContratoDeletePopupComponent } from './tipo-contrato-delete-dialog.component';
import { TipoContratoDetailComponent } from './tipo-contrato-detail.component';
import { TipoContratoPopupComponent } from './tipo-contrato-dialog.component';
import { UserRouteAccessService } from '../../shared';

export const tipoContratoRoute: Routes = [
    {
        path: CMS_PATH + '/tipo-contrato',
        component: TipoContratoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoContratoes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: CMS_PATH + '/tipo-contrato/:id',
        component: TipoContratoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoContratoes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoContratoPopupRoute: Routes = [
    {
        path: 'tipo-contrato-new',
        component: TipoContratoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoContratoes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-contrato/:id/edit',
        component: TipoContratoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoContratoes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-contrato/:id/delete',
        component: TipoContratoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoContratoes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
