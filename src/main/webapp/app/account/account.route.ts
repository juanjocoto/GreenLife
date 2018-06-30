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

import { CMS_PATH } from '../app.constants';
import { Routes } from '@angular/router';

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

ACCOUNT_ROUTES.forEach((a) => a.path = `${CMS_PATH}/${a.path}`);

export const accountState: Routes = [{
    path: '',
    children: ACCOUNT_ROUTES
}];
