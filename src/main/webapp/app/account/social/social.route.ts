import { CMS_PATH } from './../../app.constants';
import { Route } from '@angular/router';
import { SocialAuthComponent } from './social-auth.component';
import { SocialRegisterComponent } from './social-register.component';
import { UserRouteAccessService } from '../../shared';

export const socialRegisterRoute: Route = {
    path: CMS_PATH + '/social-register/:provider?{success:boolean}',
    component: SocialRegisterComponent,
    data: {
        authorities: [],
        pageTitle: 'Register with {{ label }}'
    },
    canActivate: [UserRouteAccessService]
};

export const socialAuthRoute: Route = {
    path: 'social-auth',
    component: SocialAuthComponent,
    data: {
        authorities: [],
        pageTitle: 'Register with {{ label }}'
    },
    canActivate: [UserRouteAccessService]
};
