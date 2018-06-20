/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GreenlifeTestModule } from '../../../test.module';
import { ComentarioPublicacionDialogComponent } from '../../../../../../main/webapp/app/entities/comentario-publicacion/comentario-publicacion-dialog.component';
import { ComentarioPublicacionService } from '../../../../../../main/webapp/app/entities/comentario-publicacion/comentario-publicacion.service';
import { ComentarioPublicacion } from '../../../../../../main/webapp/app/entities/comentario-publicacion/comentario-publicacion.model';
import { UsuarioService } from '../../../../../../main/webapp/app/entities/usuario';
import { PublicacionService } from '../../../../../../main/webapp/app/entities/publicacion';

describe('Component Tests', () => {

    describe('ComentarioPublicacion Management Dialog Component', () => {
        let comp: ComentarioPublicacionDialogComponent;
        let fixture: ComponentFixture<ComentarioPublicacionDialogComponent>;
        let service: ComentarioPublicacionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [ComentarioPublicacionDialogComponent],
                providers: [
                    UsuarioService,
                    PublicacionService,
                    ComentarioPublicacionService
                ]
            })
            .overrideTemplate(ComentarioPublicacionDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComentarioPublicacionDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComentarioPublicacionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ComentarioPublicacion(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.comentarioPublicacion = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'comentarioPublicacionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ComentarioPublicacion();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.comentarioPublicacion = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'comentarioPublicacionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
