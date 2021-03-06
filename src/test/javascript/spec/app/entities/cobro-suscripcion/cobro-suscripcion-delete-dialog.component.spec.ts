/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GreenlifeTestModule } from '../../../test.module';
import { CobroSuscripcionDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/cobro-suscripcion/cobro-suscripcion-delete-dialog.component';
import { CobroSuscripcionService } from '../../../../../../main/webapp/app/entities/cobro-suscripcion/cobro-suscripcion.service';

describe('Component Tests', () => {

    describe('CobroSuscripcion Management Delete Component', () => {
        let comp: CobroSuscripcionDeleteDialogComponent;
        let fixture: ComponentFixture<CobroSuscripcionDeleteDialogComponent>;
        let service: CobroSuscripcionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [CobroSuscripcionDeleteDialogComponent],
                providers: [
                    CobroSuscripcionService
                ]
            })
            .overrideTemplate(CobroSuscripcionDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CobroSuscripcionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CobroSuscripcionService);
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
