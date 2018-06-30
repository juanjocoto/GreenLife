import { CMS_PATH } from '../../app.constants';
import { LogsComponent } from './logs.component';
import { Route } from '@angular/router';

export const logsRoute: Route = {
    path: `${CMS_PATH}/logs`,
    component: LogsComponent,
    data: {
        pageTitle: 'Logs'
    }
};
