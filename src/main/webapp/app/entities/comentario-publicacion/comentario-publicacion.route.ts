import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ComentarioPublicacionComponent } from './comentario-publicacion.component';
import { ComentarioPublicacionDetailComponent } from './comentario-publicacion-detail.component';
import { ComentarioPublicacionPopupComponent } from './comentario-publicacion-dialog.component';
import { ComentarioPublicacionDeletePopupComponent } from './comentario-publicacion-delete-dialog.component';

export const comentarioPublicacionRoute: Routes = [
    {
        path: 'comentario-publicacion',
        component: ComentarioPublicacionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ComentarioPublicacions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'comentario-publicacion/:id',
        component: ComentarioPublicacionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ComentarioPublicacions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const comentarioPublicacionPopupRoute: Routes = [
    {
        path: 'comentario-publicacion-new',
        component: ComentarioPublicacionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ComentarioPublicacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'comentario-publicacion/:id/edit',
        component: ComentarioPublicacionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ComentarioPublicacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'comentario-publicacion/:id/delete',
        component: ComentarioPublicacionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ComentarioPublicacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
