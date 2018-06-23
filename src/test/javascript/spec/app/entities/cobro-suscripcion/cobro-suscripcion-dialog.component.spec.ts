/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GreenlifeTestModule } from '../../../test.module';
import { CobroSuscripcionDialogComponent } from '../../../../../../main/webapp/app/entities/cobro-suscripcion/cobro-suscripcion-dialog.component';
import { CobroSuscripcionService } from '../../../../../../main/webapp/app/entities/cobro-suscripcion/cobro-suscripcion.service';
import { CobroSuscripcion } from '../../../../../../main/webapp/app/entities/cobro-suscripcion/cobro-suscripcion.model';
import { PagoService } from '../../../../../../main/webapp/app/entities/pago';
import { UsuarioService } from '../../../../../../main/webapp/app/entities/usuario';
import { ComercioService } from '../../../../../../main/webapp/app/entities/comercio';
import { SuscripcionService } from '../../../../../../main/webapp/app/entities/suscripcion';

describe('Component Tests', () => {

    describe('CobroSuscripcion Management Dialog Component', () => {
        let comp: CobroSuscripcionDialogComponent;
        let fixture: ComponentFixture<CobroSuscripcionDialogComponent>;
        let service: CobroSuscripcionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [CobroSuscripcionDialogComponent],
                providers: [
                    PagoService,
                    UsuarioService,
                    ComercioService,
                    SuscripcionService,
                    CobroSuscripcionService
                ]
            })
            .overrideTemplate(CobroSuscripcionDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CobroSuscripcionDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CobroSuscripcionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CobroSuscripcion(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cobroSuscripcion = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cobroSuscripcionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CobroSuscripcion();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cobroSuscripcion = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cobroSuscripcionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
