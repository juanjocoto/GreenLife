import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ConfiguracionComponent } from './configuracion.component';
import { ConfiguracionDetailComponent } from './configuracion-detail.component';
import { ConfiguracionPopupComponent } from './configuracion-dialog.component';
import { ConfiguracionDeletePopupComponent } from './configuracion-delete-dialog.component';

export const configuracionRoute: Routes = [
    {
        path: 'configuracion',
        component: ConfiguracionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Configuracions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'configuracion/:id',
        component: ConfiguracionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Configuracions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const configuracionPopupRoute: Routes = [
    {
        path: 'configuracion-new',
        component: ConfiguracionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Configuracions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'configuracion/:id/edit',
        component: ConfiguracionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Configuracions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'configuracion/:id/delete',
        component: ConfiguracionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Configuracions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
