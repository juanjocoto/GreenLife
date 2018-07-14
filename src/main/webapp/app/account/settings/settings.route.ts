import { CMS_PATH } from './../../app.constants';
import { Route } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { UserRouteAccessService } from '../../shared';

export const settingsRoute: Route = {
    path: CMS_PATH + '/settings',
    component: SettingsComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Settings'
    },
    canActivate: [UserRouteAccessService]
};
