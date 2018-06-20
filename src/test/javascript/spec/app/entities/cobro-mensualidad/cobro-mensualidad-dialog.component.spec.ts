/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GreenlifeTestModule } from '../../../test.module';
import { CobroMensualidadDialogComponent } from '../../../../../../main/webapp/app/entities/cobro-mensualidad/cobro-mensualidad-dialog.component';
import { CobroMensualidadService } from '../../../../../../main/webapp/app/entities/cobro-mensualidad/cobro-mensualidad.service';
import { CobroMensualidad } from '../../../../../../main/webapp/app/entities/cobro-mensualidad/cobro-mensualidad.model';
import { PagoService } from '../../../../../../main/webapp/app/entities/pago';
import { ContratoService } from '../../../../../../main/webapp/app/entities/contrato';

describe('Component Tests', () => {

    describe('CobroMensualidad Management Dialog Component', () => {
        let comp: CobroMensualidadDialogComponent;
        let fixture: ComponentFixture<CobroMensualidadDialogComponent>;
        let service: CobroMensualidadService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [CobroMensualidadDialogComponent],
                providers: [
                    PagoService,
                    ContratoService,
                    CobroMensualidadService
                ]
            })
            .overrideTemplate(CobroMensualidadDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CobroMensualidadDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CobroMensualidadService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CobroMensualidad(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cobroMensualidad = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cobroMensualidadListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CobroMensualidad();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cobroMensualidad = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cobroMensualidadListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
