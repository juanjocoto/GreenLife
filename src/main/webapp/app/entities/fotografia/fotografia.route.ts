import { CMS_PATH } from './../../app.constants';
import { FotografiaComponent } from './fotografia.component';
import { FotografiaDeletePopupComponent } from './fotografia-delete-dialog.component';
import { FotografiaDetailComponent } from './fotografia-detail.component';
import { FotografiaPopupComponent } from './fotografia-dialog.component';
import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

export const fotografiaRoute: Routes = [
    {
        path: CMS_PATH + '/fotografia',
        component: FotografiaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Fotografias'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: CMS_PATH + '/fotografia/:id',
        component: FotografiaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Fotografias'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fotografiaPopupRoute: Routes = [
    {
        path: 'fotografia-new',
        component: FotografiaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Fotografias'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'fotografia/:id/edit',
        component: FotografiaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Fotografias'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'fotografia/:id/delete',
        component: FotografiaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Fotografias'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
