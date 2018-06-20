import { Route } from '@angular/router';

import { HomeComponent } from './';
import { enviroment } from '../enviroment';

export const HOME_ROUTE: Route = {
    path: enviroment.cmsPath,
    component: HomeComponent,
    data: {
        authorities: [],
        pageTitle: 'Welcome, Java Hipster!'
    }
};
