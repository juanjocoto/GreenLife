import { Route, RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';

import { DEBUG_INFO_ENABLED } from './app.constants';
import { NgModule } from '@angular/core';
import { RootComponent } from './green-life/root/root.component';
import { greenLifeRoutes } from './green-life/green-life.routes';

const LAYOUT_ROUTES: Route[] = [
    { path: '', redirectTo: 'app', pathMatch: 'full' },
    {
        path: 'app',
        component: RootComponent,
        children: greenLifeRoutes
    },
    navbarRoute,
    ...errorRoute
];

@NgModule({
    imports: [
        RouterModule.forRoot(LAYOUT_ROUTES, { useHash: true, enableTracing: false })
    ],
    exports: [
        RouterModule
    ]
})
export class GreenlifeAppRoutingModule { }
