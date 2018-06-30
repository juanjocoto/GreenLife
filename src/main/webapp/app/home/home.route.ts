import { CMS_PATH } from '../app.constants';
import { HomeComponent } from './';
import { Route } from '@angular/router';

export const HOME_ROUTE: Route = {
    path: CMS_PATH,
    component: HomeComponent,
    data: {
        authorities: [],
        pageTitle: 'Welcome, Java Hipster!'
    }
};
