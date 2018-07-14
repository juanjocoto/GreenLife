import { CMS_PATH } from './../../../app.constants';
import { PasswordResetInitComponent } from './password-reset-init.component';
import { Route } from '@angular/router';
import { UserRouteAccessService } from '../../../shared';

export const passwordResetInitRoute: Route = {
    path: CMS_PATH + '/reset/request',
    component: PasswordResetInitComponent,
    data: {
        authorities: [],
        pageTitle: 'Password'
    },
    canActivate: [UserRouteAccessService]
};
