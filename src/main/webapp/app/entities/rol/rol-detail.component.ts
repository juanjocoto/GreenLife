import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Rol } from './rol.model';
import { RolService } from './rol.service';

@Component({
    selector: 'jhi-rol-detail',
    templateUrl: './rol-detail.component.html'
})
export class RolDetailComponent implements OnInit, OnDestroy {

    rol: Rol;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private rolService: RolService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRols();
    }

    load(id) {
        this.rolService.find(id)
            .subscribe((rolResponse: HttpResponse<Rol>) => {
                this.rol = rolResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRols() {
        this.eventSubscriber = this.eventManager.subscribe(
            'rolListModification',
            (response) => this.load(this.rol.id)
        );
    }
}
