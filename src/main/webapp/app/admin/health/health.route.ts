import { JhiHealthCheckComponent } from './health.component';
import { Route } from '@angular/router';
import { enviroment } from './../../enviroment';

export const healthRoute: Route = {
    path: `${enviroment.cmsPath}/jhi-health`,
    component: JhiHealthCheckComponent,
    data: {
        pageTitle: 'Health Checks'
    }
};
