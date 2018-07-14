import { CMS_PATH } from './../../app.constants';
import { CadenaOrdenRecoleccionComponent } from './cadena-orden-recoleccion.component';
import { CadenaOrdenRecoleccionDeletePopupComponent } from './cadena-orden-recoleccion-delete-dialog.component';
import { CadenaOrdenRecoleccionDetailComponent } from './cadena-orden-recoleccion-detail.component';
import { CadenaOrdenRecoleccionPopupComponent } from './cadena-orden-recoleccion-dialog.component';
import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

export const cadenaOrdenRecoleccionRoute: Routes = [
    {
        path: CMS_PATH + '/cadena-orden-recoleccion',
        component: CadenaOrdenRecoleccionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CadenaOrdenRecoleccions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: CMS_PATH + '/cadena-orden-recoleccion/:id',
        component: CadenaOrdenRecoleccionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CadenaOrdenRecoleccions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cadenaOrdenRecoleccionPopupRoute: Routes = [
    {
        path: 'cadena-orden-recoleccion-new',
        component: CadenaOrdenRecoleccionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CadenaOrdenRecoleccions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cadena-orden-recoleccion/:id/edit',
        component: CadenaOrdenRecoleccionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CadenaOrdenRecoleccions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cadena-orden-recoleccion/:id/delete',
        component: CadenaOrdenRecoleccionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CadenaOrdenRecoleccions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
