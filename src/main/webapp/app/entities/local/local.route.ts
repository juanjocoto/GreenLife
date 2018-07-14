import { CMS_PATH } from './../../app.constants';
import { LocalComponent } from './local.component';
import { LocalDeletePopupComponent } from './local-delete-dialog.component';
import { LocalDetailComponent } from './local-detail.component';
import { LocalPopupComponent } from './local-dialog.component';
import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

export const localRoute: Routes = [
    {
        path: CMS_PATH + '/local',
        component: LocalComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Locals'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: CMS_PATH + '/local/:id',
        component: LocalDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Locals'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const localPopupRoute: Routes = [
    {
        path: 'local-new',
        component: LocalPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Locals'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'local/:id/edit',
        component: LocalPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Locals'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'local/:id/delete',
        component: LocalDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Locals'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
