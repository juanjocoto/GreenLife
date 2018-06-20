import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CategoriaAlimentacion } from './categoria-alimentacion.model';
import { CategoriaAlimentacionService } from './categoria-alimentacion.service';

@Component({
    selector: 'jhi-categoria-alimentacion-detail',
    templateUrl: './categoria-alimentacion-detail.component.html'
})
export class CategoriaAlimentacionDetailComponent implements OnInit, OnDestroy {

    categoriaAlimentacion: CategoriaAlimentacion;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private categoriaAlimentacionService: CategoriaAlimentacionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCategoriaAlimentacions();
    }

    load(id) {
        this.categoriaAlimentacionService.find(id)
            .subscribe((categoriaAlimentacionResponse: HttpResponse<CategoriaAlimentacion>) => {
                this.categoriaAlimentacion = categoriaAlimentacionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCategoriaAlimentacions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'categoriaAlimentacionListModification',
            (response) => this.load(this.categoriaAlimentacion.id)
        );
    }
}
