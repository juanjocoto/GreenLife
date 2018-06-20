/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GreenlifeTestModule } from '../../../test.module';
import { ComentarioPublicacionDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/comentario-publicacion/comentario-publicacion-delete-dialog.component';
import { ComentarioPublicacionService } from '../../../../../../main/webapp/app/entities/comentario-publicacion/comentario-publicacion.service';

describe('Component Tests', () => {

    describe('ComentarioPublicacion Management Delete Component', () => {
        let comp: ComentarioPublicacionDeleteDialogComponent;
        let fixture: ComponentFixture<ComentarioPublicacionDeleteDialogComponent>;
        let service: ComentarioPublicacionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [ComentarioPublicacionDeleteDialogComponent],
                providers: [
                    ComentarioPublicacionService
                ]
            })
            .overrideTemplate(ComentarioPublicacionDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComentarioPublicacionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComentarioPublicacionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
