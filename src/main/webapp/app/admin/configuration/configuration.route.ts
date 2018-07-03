import { CMS_PATH } from '../../app.constants';
import { JhiConfigurationComponent } from './configuration.component';
import { Route } from '@angular/router';

export const configurationRoute: Route = {
    path: `${CMS_PATH}/jhi-configuration`,
    component: JhiConfigurationComponent,
    data: {
        pageTitle: 'Configuration'
    }
};
