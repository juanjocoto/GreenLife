import { AuditsComponent } from './audits.component';
import { CMS_PATH } from '../../app.constants';
import { Route } from '@angular/router';

export const auditsRoute: Route = {
    path: `${CMS_PATH}/audits`,
    component: AuditsComponent,
    data: {
        pageTitle: 'Audits'
    }
};
