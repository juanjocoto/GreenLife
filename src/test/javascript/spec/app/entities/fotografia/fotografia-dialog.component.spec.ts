/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GreenlifeTestModule } from '../../../test.module';
import { FotografiaDialogComponent } from '../../../../../../main/webapp/app/entities/fotografia/fotografia-dialog.component';
import { FotografiaService } from '../../../../../../main/webapp/app/entities/fotografia/fotografia.service';
import { Fotografia } from '../../../../../../main/webapp/app/entities/fotografia/fotografia.model';
import { CentroAcopioService } from '../../../../../../main/webapp/app/entities/centro-acopio';
import { ComercioService } from '../../../../../../main/webapp/app/entities/comercio';
import { ProductoService } from '../../../../../../main/webapp/app/entities/producto';
import { PublicacionService } from '../../../../../../main/webapp/app/entities/publicacion';
import { EventoService } from '../../../../../../main/webapp/app/entities/evento';
import { PatrocinadorService } from '../../../../../../main/webapp/app/entities/patrocinador';

describe('Component Tests', () => {

    describe('Fotografia Management Dialog Component', () => {
        let comp: FotografiaDialogComponent;
        let fixture: ComponentFixture<FotografiaDialogComponent>;
        let service: FotografiaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [FotografiaDialogComponent],
                providers: [
                    CentroAcopioService,
                    ComercioService,
                    ProductoService,
                    PublicacionService,
                    EventoService,
                    PatrocinadorService,
                    FotografiaService
                ]
            })
            .overrideTemplate(FotografiaDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FotografiaDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FotografiaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Fotografia(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.fotografia = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'fotografiaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Fotografia();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.fotografia = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'fotografiaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
