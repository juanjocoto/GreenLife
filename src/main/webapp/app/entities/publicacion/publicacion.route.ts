import { CMS_PATH } from './../../app.constants';
import { PublicacionComponent } from './publicacion.component';
import { PublicacionDeletePopupComponent } from './publicacion-delete-dialog.component';
import { PublicacionDetailComponent } from './publicacion-detail.component';
import { PublicacionPopupComponent } from './publicacion-dialog.component';
import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

export const publicacionRoute: Routes = [
    {
        path: CMS_PATH + '/publicacion',
        component: PublicacionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Publicacions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: CMS_PATH + '/publicacion/:id',
        component: PublicacionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Publicacions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const publicacionPopupRoute: Routes = [
    {
        path: 'publicacion-new',
        component: PublicacionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Publicacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'publicacion/:id/edit',
        component: PublicacionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Publicacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'publicacion/:id/delete',
        component: PublicacionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Publicacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
