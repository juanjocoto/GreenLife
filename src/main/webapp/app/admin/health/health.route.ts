import { CMS_PATH } from '../../app.constants';
import { JhiHealthCheckComponent } from './health.component';
import { Route } from '@angular/router';

export const healthRoute: Route = {
    path: `${CMS_PATH}/jhi-health`,
    component: JhiHealthCheckComponent,
    data: {
        pageTitle: 'Health Checks'
    }
};
