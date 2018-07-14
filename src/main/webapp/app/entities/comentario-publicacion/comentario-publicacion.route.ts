import { CMS_PATH } from './../../app.constants';
import { ComentarioPublicacionComponent } from './comentario-publicacion.component';
import { ComentarioPublicacionDeletePopupComponent } from './comentario-publicacion-delete-dialog.component';
import { ComentarioPublicacionDetailComponent } from './comentario-publicacion-detail.component';
import { ComentarioPublicacionPopupComponent } from './comentario-publicacion-dialog.component';
import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

export const comentarioPublicacionRoute: Routes = [
    {
        path: CMS_PATH + '/comentario-publicacion',
        component: ComentarioPublicacionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ComentarioPublicacions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: CMS_PATH + '/comentario-publicacion/:id',
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
