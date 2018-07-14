import { ActivateComponent } from './activate.component';
import { CMS_PATH } from './../../app.constants';
import { Route } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

export const activateRoute: Route = {
    path: CMS_PATH + '/activate',
    component: ActivateComponent,
    data: {
        authorities: [],
        pageTitle: 'Activation'
    },
    canActivate: [UserRouteAccessService]
};
