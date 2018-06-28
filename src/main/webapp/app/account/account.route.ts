import {
    activateRoute,
    passwordResetFinishRoute,
    passwordResetInitRoute,
    passwordRoute,
    registerRoute,
    settingsRoute,
    socialAuthRoute,
    socialRegisterRoute
} from './';

import { Routes } from '@angular/router';
import { enviroment } from './../enviroment';

const ACCOUNT_ROUTES = [
    activateRoute,
    passwordRoute,
    passwordResetFinishRoute,
    passwordResetInitRoute,
    registerRoute,
    socialAuthRoute,
    socialRegisterRoute,
    settingsRoute
];

ACCOUNT_ROUTES.forEach((a) => a.path = `${enviroment.cmsPath}/${a.path}`);

export const accountState: Routes = [{
    path: '',
    children: ACCOUNT_ROUTES
}];
