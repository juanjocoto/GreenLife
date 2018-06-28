import { JhiConfigurationComponent } from './configuration.component';
import { Route } from '@angular/router';
import { enviroment } from './../../enviroment';

export const configurationRoute: Route = {
    path: `${enviroment.cmsPath}/jhi-configuration`,
    component: JhiConfigurationComponent,
    data: {
        pageTitle: 'Configuration'
    }
};
