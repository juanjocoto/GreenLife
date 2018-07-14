import { CMS_PATH } from './../../app.constants';
import { ConfiguracionComponent } from './configuracion.component';
import { ConfiguracionDeletePopupComponent } from './configuracion-delete-dialog.component';
import { ConfiguracionDetailComponent } from './configuracion-detail.component';
import { ConfiguracionPopupComponent } from './configuracion-dialog.component';
import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

export const configuracionRoute: Routes = [
    {
        path: `${CMS_PATH}/configuracion`,
        component: ConfiguracionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Configuracions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: `${CMS_PATH}/configuracion:id`,
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
