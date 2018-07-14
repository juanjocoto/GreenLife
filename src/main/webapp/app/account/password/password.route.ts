import { CMS_PATH } from './../../app.constants';
import { PasswordComponent } from './password.component';
import { Route } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

export const passwordRoute: Route = {
    path: CMS_PATH + '/password',
    component: PasswordComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Password'
    },
    canActivate: [UserRouteAccessService]
};
