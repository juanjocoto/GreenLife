import { CMS_PATH } from './../../app.constants';
import { ProductoComponent } from './producto.component';
import { ProductoDeletePopupComponent } from './producto-delete-dialog.component';
import { ProductoDetailComponent } from './producto-detail.component';
import { ProductoPopupComponent } from './producto-dialog.component';
import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

export const productoRoute: Routes = [
    {
        path: CMS_PATH + '/producto',
        component: ProductoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Productos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: CMS_PATH + '/producto/:id',
        component: ProductoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Productos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productoPopupRoute: Routes = [
    {
        path: 'producto-new',
        component: ProductoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Productos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'producto/:id/edit',
        component: ProductoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Productos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'producto/:id/delete',
        component: ProductoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Productos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
