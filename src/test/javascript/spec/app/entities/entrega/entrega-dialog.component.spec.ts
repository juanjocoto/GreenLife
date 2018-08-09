/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GreenlifeTestModule } from '../../../test.module';
import { EntregaDialogComponent } from '../../../../../../main/webapp/app/entities/entrega/entrega-dialog.component';
import { EntregaService } from '../../../../../../main/webapp/app/entities/entrega/entrega.service';
import { Entrega } from '../../../../../../main/webapp/app/entities/entrega/entrega.model';
import { SuscripcionService } from '../../../../../../main/webapp/app/entities/suscripcion';
import { PedidoService } from '../../../../../../main/webapp/app/entities/pedido';
import { CadenaEntregaService } from '../../../../../../main/webapp/app/entities/cadena-entrega';

describe('Component Tests', () => {

    describe('Entrega Management Dialog Component', () => {
        let comp: EntregaDialogComponent;
        let fixture: ComponentFixture<EntregaDialogComponent>;
        let service: EntregaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [EntregaDialogComponent],
                providers: [
                    SuscripcionService,
                    PedidoService,
                    CadenaEntregaService,
                    EntregaService
                ]
            })
            .overrideTemplate(EntregaDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntregaDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntregaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Entrega(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.entrega = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'entregaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Entrega();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.entrega = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'entregaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
