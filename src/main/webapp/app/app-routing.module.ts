import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { greenLifeRoutes } from './green-life/green-life.routes';
import { RootComponent } from './green-life/root/root.component';
import { AuthGuard } from './green-life/shared/guards/auth.guard';
import { errorRoute, navbarRoute } from './layouts';

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
    ],
    providers: [AuthGuard]
})
export class GreenlifeAppRoutingModule { }
