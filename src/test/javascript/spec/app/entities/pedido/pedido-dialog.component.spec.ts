/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GreenlifeTestModule } from '../../../test.module';
import { PedidoDialogComponent } from '../../../../../../main/webapp/app/entities/pedido/pedido-dialog.component';
import { PedidoService } from '../../../../../../main/webapp/app/entities/pedido/pedido.service';
import { Pedido } from '../../../../../../main/webapp/app/entities/pedido/pedido.model';
import { SuscripcionService } from '../../../../../../main/webapp/app/entities/suscripcion';
import { DiaEntregaService } from '../../../../../../main/webapp/app/entities/dia-entrega';
import { LocalService } from '../../../../../../main/webapp/app/entities/local';

describe('Component Tests', () => {

    describe('Pedido Management Dialog Component', () => {
        let comp: PedidoDialogComponent;
        let fixture: ComponentFixture<PedidoDialogComponent>;
        let service: PedidoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [PedidoDialogComponent],
                providers: [
                    SuscripcionService,
                    DiaEntregaService,
                    LocalService,
                    PedidoService
                ]
            })
            .overrideTemplate(PedidoDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PedidoDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PedidoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Pedido(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.pedido = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'pedidoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Pedido();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.pedido = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'pedidoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
