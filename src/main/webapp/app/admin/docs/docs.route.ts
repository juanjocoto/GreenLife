import { CMS_PATH } from '../../app.constants';
import { JhiDocsComponent } from './docs.component';
import { Route } from '@angular/router';

export const docsRoute: Route = {
    path: `${CMS_PATH}/docs`,
    component: JhiDocsComponent,
    data: {
        pageTitle: 'API'
    }
};
