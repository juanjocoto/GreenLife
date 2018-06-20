/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GreenlifeTestModule } from '../../../test.module';
import { CentroAcopioDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/centro-acopio/centro-acopio-delete-dialog.component';
import { CentroAcopioService } from '../../../../../../main/webapp/app/entities/centro-acopio/centro-acopio.service';

describe('Component Tests', () => {

    describe('CentroAcopio Management Delete Component', () => {
        let comp: CentroAcopioDeleteDialogComponent;
        let fixture: ComponentFixture<CentroAcopioDeleteDialogComponent>;
        let service: CentroAcopioService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [CentroAcopioDeleteDialogComponent],
                providers: [
                    CentroAcopioService
                ]
            })
            .overrideTemplate(CentroAcopioDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CentroAcopioDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CentroAcopioService);
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
