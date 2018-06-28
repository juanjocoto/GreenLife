import { LogsComponent } from './logs.component';
import { Route } from '@angular/router';
import { enviroment } from './../../enviroment';

export const logsRoute: Route = {
    path: `${enviroment.cmsPath}/logs`,
    component: LogsComponent,
    data: {
        pageTitle: 'Logs'
    }
};
