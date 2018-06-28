import { JhiTrackerComponent } from './tracker.component';
import { Route } from '@angular/router';
import { enviroment } from './../../enviroment';

export const trackerRoute: Route = {
    path: `${enviroment.cmsPath}/jhi-tracker`,
    component: JhiTrackerComponent,
    data: {
        pageTitle: 'Real-time user activities'
    }
};
