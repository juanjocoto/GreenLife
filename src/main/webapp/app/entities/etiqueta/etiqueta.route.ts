import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EtiquetaComponent } from './etiqueta.component';
import { EtiquetaDetailComponent } from './etiqueta-detail.component';
import { EtiquetaPopupComponent } from './etiqueta-dialog.component';
import { EtiquetaDeletePopupComponent } from './etiqueta-delete-dialog.component';

export const etiquetaRoute: Routes = [
    {
        path: 'etiqueta',
        component: EtiquetaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Etiquetas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'etiqueta/:id',
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
