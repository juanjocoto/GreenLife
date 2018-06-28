import { JhiDocsComponent } from './docs.component';
import { Route } from '@angular/router';
import { enviroment } from '../../enviroment';

export const docsRoute: Route = {
    path: `${enviroment.cmsPath}/docs`,
    component: JhiDocsComponent,
    data: {
        pageTitle: 'API'
    }
};
