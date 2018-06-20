/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GreenlifeTestModule } from '../../../test.module';
import { SolicitudPatrocinioDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/solicitud-patrocinio/solicitud-patrocinio-delete-dialog.component';
import { SolicitudPatrocinioService } from '../../../../../../main/webapp/app/entities/solicitud-patrocinio/solicitud-patrocinio.service';

describe('Component Tests', () => {

    describe('SolicitudPatrocinio Management Delete Component', () => {
        let comp: SolicitudPatrocinioDeleteDialogComponent;
        let fixture: ComponentFixture<SolicitudPatrocinioDeleteDialogComponent>;
        let service: SolicitudPatrocinioService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [SolicitudPatrocinioDeleteDialogComponent],
                providers: [
                    SolicitudPatrocinioService
                ]
            })
            .overrideTemplate(SolicitudPatrocinioDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SolicitudPatrocinioDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SolicitudPatrocinioService);
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
