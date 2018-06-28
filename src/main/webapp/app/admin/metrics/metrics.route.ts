import { JhiMetricsMonitoringComponent } from './metrics.component';
import { Route } from '@angular/router';
import { enviroment } from './../../enviroment';

export const metricsRoute: Route = {
    path: `${enviroment.cmsPath}/jhi-metrics`,
    component: JhiMetricsMonitoringComponent,
    data: {
        pageTitle: 'Application Metrics'
    }
};
