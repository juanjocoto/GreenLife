import { CMS_PATH } from './../../../app.constants';
import { PasswordResetFinishComponent } from './password-reset-finish.component';
import { Route } from '@angular/router';
import { UserRouteAccessService } from '../../../shared';

export const passwordResetFinishRoute: Route = {
    path: CMS_PATH + '/reset/finish',
    component: PasswordResetFinishComponent,
    data: {
        authorities: [],
        pageTitle: 'Password'
    },
    canActivate: [UserRouteAccessService]
};
