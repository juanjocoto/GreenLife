import { CMS_PATH } from '../../app.constants';
import { ComercioComponent } from './comercio.component';
import { ComercioDeletePopupComponent } from './comercio-delete-dialog.component';
import { ComercioDetailComponent } from './comercio-detail.component';
import { ComercioPopupComponent } from './comercio-dialog.component';
import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

export const comercioRoute: Routes = [
    {
        path: `${CMS_PATH}/comercio`,
        component: ComercioComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comercios'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: `${CMS_PATH}/comercio/:id`,
        component: ComercioDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comercios'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const comercioPopupRoute: Routes = [
    {
        path: 'comercio-new',
        component: ComercioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comercios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'comercio/:id/edit',
        component: ComercioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comercios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'comercio/:id/delete',
        component: ComercioDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comercios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
