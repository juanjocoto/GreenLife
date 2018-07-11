import { CMS_PATH } from '../../app.constants';
import { LineaProductoComponent } from './linea-producto.component';
import { LineaProductoDeletePopupComponent } from './linea-producto-delete-dialog.component';
import { LineaProductoDetailComponent } from './linea-producto-detail.component';
import { LineaProductoPopupComponent } from './linea-producto-dialog.component';
import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

export const lineaProductoRoute: Routes = [
    {
        path: `${CMS_PATH}/linea-producto`,
        component: LineaProductoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LineaProductos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: `${CMS_PATH}/linea-producto/:id`,
        component: LineaProductoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LineaProductos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const lineaProductoPopupRoute: Routes = [
    {
        path: 'linea-producto-new',
        component: LineaProductoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LineaProductos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'linea-producto/:id/edit',
        component: LineaProductoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LineaProductos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'linea-producto/:id/delete',
        component: LineaProductoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LineaProductos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
