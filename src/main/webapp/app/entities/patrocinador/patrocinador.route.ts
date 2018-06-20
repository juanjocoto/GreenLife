import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PatrocinadorComponent } from './patrocinador.component';
import { PatrocinadorDetailComponent } from './patrocinador-detail.component';
import { PatrocinadorPopupComponent } from './patrocinador-dialog.component';
import { PatrocinadorDeletePopupComponent } from './patrocinador-delete-dialog.component';

export const patrocinadorRoute: Routes = [
    {
        path: 'patrocinador',
        component: PatrocinadorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Patrocinadors'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'patrocinador/:id',
        component: PatrocinadorDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Patrocinadors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const patrocinadorPopupRoute: Routes = [
    {
        path: 'patrocinador-new',
        component: PatrocinadorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Patrocinadors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'patrocinador/:id/edit',
        component: PatrocinadorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Patrocinadors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'patrocinador/:id/delete',
        component: PatrocinadorDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Patrocinadors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
