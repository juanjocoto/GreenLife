/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GreenlifeTestModule } from '../../../test.module';
import { SuscripcionDialogComponent } from '../../../../../../main/webapp/app/entities/suscripcion/suscripcion-dialog.component';
import { SuscripcionService } from '../../../../../../main/webapp/app/entities/suscripcion/suscripcion.service';
import { Suscripcion } from '../../../../../../main/webapp/app/entities/suscripcion/suscripcion.model';
import { UsuarioService } from '../../../../../../main/webapp/app/entities/usuario';
import { ComercioService } from '../../../../../../main/webapp/app/entities/comercio';

describe('Component Tests', () => {

    describe('Suscripcion Management Dialog Component', () => {
        let comp: SuscripcionDialogComponent;
        let fixture: ComponentFixture<SuscripcionDialogComponent>;
        let service: SuscripcionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [SuscripcionDialogComponent],
                providers: [
                    UsuarioService,
                    ComercioService,
                    SuscripcionService
                ]
            })
            .overrideTemplate(SuscripcionDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SuscripcionDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SuscripcionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Suscripcion(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.suscripcion = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'suscripcionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Suscripcion();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.suscripcion = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'suscripcionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
