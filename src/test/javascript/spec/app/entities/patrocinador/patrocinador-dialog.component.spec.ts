/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GreenlifeTestModule } from '../../../test.module';
import { PatrocinadorDialogComponent } from '../../../../../../main/webapp/app/entities/patrocinador/patrocinador-dialog.component';
import { PatrocinadorService } from '../../../../../../main/webapp/app/entities/patrocinador/patrocinador.service';
import { Patrocinador } from '../../../../../../main/webapp/app/entities/patrocinador/patrocinador.model';
import { SolicitudPatrocinioService } from '../../../../../../main/webapp/app/entities/solicitud-patrocinio';
import { EventoService } from '../../../../../../main/webapp/app/entities/evento';

describe('Component Tests', () => {

    describe('Patrocinador Management Dialog Component', () => {
        let comp: PatrocinadorDialogComponent;
        let fixture: ComponentFixture<PatrocinadorDialogComponent>;
        let service: PatrocinadorService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [PatrocinadorDialogComponent],
                providers: [
                    SolicitudPatrocinioService,
                    EventoService,
                    PatrocinadorService
                ]
            })
            .overrideTemplate(PatrocinadorDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PatrocinadorDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PatrocinadorService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Patrocinador(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.patrocinador = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'patrocinadorListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Patrocinador();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.patrocinador = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'patrocinadorListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
