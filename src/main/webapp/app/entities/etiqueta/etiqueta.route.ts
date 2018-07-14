import { CMS_PATH } from './../../app.constants';
import { EtiquetaComponent } from './etiqueta.component';
import { EtiquetaDeletePopupComponent } from './etiqueta-delete-dialog.component';
import { EtiquetaDetailComponent } from './etiqueta-detail.component';
import { EtiquetaPopupComponent } from './etiqueta-dialog.component';
import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

export const etiquetaRoute: Routes = [
    {
        path: CMS_PATH + '/etiqueta',
        component: EtiquetaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Etiquetas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: CMS_PATH + '/etiqueta/:id',
        component: EtiquetaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Etiquetas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const etiquetaPopupRoute: Routes = [
    {
        path: 'etiqueta-new',
        component: EtiquetaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Etiquetas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'etiqueta/:id/edit',
        component: EtiquetaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Etiquetas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'etiqueta/:id/delete',
        component: EtiquetaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Etiquetas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
