/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GreenlifeTestModule } from '../../../test.module';
import { SolicitudSuscripcionDialogComponent } from '../../../../../../main/webapp/app/entities/solicitud-suscripcion/solicitud-suscripcion-dialog.component';
import { SolicitudSuscripcionService } from '../../../../../../main/webapp/app/entities/solicitud-suscripcion/solicitud-suscripcion.service';
import { SolicitudSuscripcion } from '../../../../../../main/webapp/app/entities/solicitud-suscripcion/solicitud-suscripcion.model';
import { ClienteService } from '../../../../../../main/webapp/app/entities/cliente';
import { ComercioService } from '../../../../../../main/webapp/app/entities/comercio';

describe('Component Tests', () => {

    describe('SolicitudSuscripcion Management Dialog Component', () => {
        let comp: SolicitudSuscripcionDialogComponent;
        let fixture: ComponentFixture<SolicitudSuscripcionDialogComponent>;
        let service: SolicitudSuscripcionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [SolicitudSuscripcionDialogComponent],
                providers: [
                    ClienteService,
                    ComercioService,
                    SolicitudSuscripcionService
                ]
            })
            .overrideTemplate(SolicitudSuscripcionDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SolicitudSuscripcionDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SolicitudSuscripcionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SolicitudSuscripcion(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.solicitudSuscripcion = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'solicitudSuscripcionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SolicitudSuscripcion();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.solicitudSuscripcion = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'solicitudSuscripcionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
