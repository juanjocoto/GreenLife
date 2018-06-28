import { AuditsComponent } from './audits.component';
import { Route } from '@angular/router';
import { enviroment } from './../../enviroment';

export const auditsRoute: Route = {
    path: `${enviroment.cmsPath}/audits`,
    component: AuditsComponent,
    data: {
        pageTitle: 'Audits'
    }
};
