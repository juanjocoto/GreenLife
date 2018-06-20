/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GreenlifeTestModule } from '../../../test.module';
import { SolicitudSuscripcionDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/solicitud-suscripcion/solicitud-suscripcion-delete-dialog.component';
import { SolicitudSuscripcionService } from '../../../../../../main/webapp/app/entities/solicitud-suscripcion/solicitud-suscripcion.service';

describe('Component Tests', () => {

    describe('SolicitudSuscripcion Management Delete Component', () => {
        let comp: SolicitudSuscripcionDeleteDialogComponent;
        let fixture: ComponentFixture<SolicitudSuscripcionDeleteDialogComponent>;
        let service: SolicitudSuscripcionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [SolicitudSuscripcionDeleteDialogComponent],
                providers: [
                    SolicitudSuscripcionService
                ]
            })
            .overrideTemplate(SolicitudSuscripcionDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SolicitudSuscripcionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SolicitudSuscripcionService);
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
