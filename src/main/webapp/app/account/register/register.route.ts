import { CMS_PATH } from './../../app.constants';
import { RegisterComponent } from './register.component';
import { Route } from '@angular/router';

export const registerRoute: Route = {
    path: CMS_PATH + '/register',
    component: RegisterComponent,
    data: {
        authorities: [],
        pageTitle: 'Registration'
    }
};
