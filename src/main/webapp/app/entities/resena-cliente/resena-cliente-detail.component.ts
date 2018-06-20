import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ResenaCliente } from './resena-cliente.model';
import { ResenaClienteService } from './resena-cliente.service';

@Component({
    selector: 'jhi-resena-cliente-detail',
    templateUrl: './resena-cliente-detail.component.html'
})
export class ResenaClienteDetailComponent implements OnInit, OnDestroy {

    resenaCliente: ResenaCliente;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private resenaClienteService: ResenaClienteService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInResenaClientes();
    }

    load(id) {
        this.resenaClienteService.find(id)
            .subscribe((resenaClienteResponse: HttpResponse<ResenaCliente>) => {
                this.resenaCliente = resenaClienteResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInResenaClientes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'resenaClienteListModification',
            (response) => this.load(this.resenaCliente.id)
        );
    }
}
