import { CMS_PATH } from '../../app.constants';
import { JhiMetricsMonitoringComponent } from './metrics.component';
import { Route } from '@angular/router';

export const metricsRoute: Route = {
    path: `${CMS_PATH}/jhi-metrics`,
    component: JhiMetricsMonitoringComponent,
    data: {
        pageTitle: 'Application Metrics'
    }
};
