import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CMS_PATH } from '../../app.constants';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html',
    styleUrls: [
        'main.scss'
    ]
})
export class JhiMainComponent implements OnInit {
e
    showCms: boolean;

    constructor(
        private titleService: Title,
        private router: Router
    ) {
        this.showCms = this.router.url.includes(CMS_PATH);
    }

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'greenlifeApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnInit() {
        this.router.events.subscribe((event) => {

            if (event instanceof NavigationEnd) {
                this.showCms = this.router.url.includes(CMS_PATH);
                this.titleService.setTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
        });
    }
}
