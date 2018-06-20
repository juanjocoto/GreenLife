/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GreenlifeTestModule } from '../../../test.module';
import { CobroMensualidadDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/cobro-mensualidad/cobro-mensualidad-delete-dialog.component';
import { CobroMensualidadService } from '../../../../../../main/webapp/app/entities/cobro-mensualidad/cobro-mensualidad.service';

describe('Component Tests', () => {

    describe('CobroMensualidad Management Delete Component', () => {
        let comp: CobroMensualidadDeleteDialogComponent;
        let fixture: ComponentFixture<CobroMensualidadDeleteDialogComponent>;
        let service: CobroMensualidadService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [CobroMensualidadDeleteDialogComponent],
                providers: [
                    CobroMensualidadService
                ]
            })
            .overrideTemplate(CobroMensualidadDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CobroMensualidadDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CobroMensualidadService);
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
