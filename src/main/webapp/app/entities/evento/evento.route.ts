import { CMS_PATH } from './../../app.constants';
import { EventoComponent } from './evento.component';
import { EventoDeletePopupComponent } from './evento-delete-dialog.component';
import { EventoDetailComponent } from './evento-detail.component';
import { EventoPopupComponent } from './evento-dialog.component';
import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

export const eventoRoute: Routes = [
    {
        path: CMS_PATH + '/evento',
        component: EventoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Eventos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: CMS_PATH + '/evento/:id',
        component: EventoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Eventos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const eventoPopupRoute: Routes = [
    {
        path: 'evento-new',
        component: EventoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Eventos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'evento/:id/edit',
        component: EventoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Eventos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'evento/:id/delete',
        component: EventoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Eventos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
