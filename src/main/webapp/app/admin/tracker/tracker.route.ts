import { CMS_PATH } from '../../app.constants';
import { JhiTrackerComponent } from './tracker.component';
import { Route } from '@angular/router';

export const trackerRoute: Route = {
    path: `${CMS_PATH}/jhi-tracker`,
    component: JhiTrackerComponent,
    data: {
        pageTitle: 'Real-time user activities'
    }
};
