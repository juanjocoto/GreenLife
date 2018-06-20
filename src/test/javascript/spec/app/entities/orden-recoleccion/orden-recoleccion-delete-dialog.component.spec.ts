/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GreenlifeTestModule } from '../../../test.module';
import { OrdenRecoleccionDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/orden-recoleccion/orden-recoleccion-delete-dialog.component';
import { OrdenRecoleccionService } from '../../../../../../main/webapp/app/entities/orden-recoleccion/orden-recoleccion.service';

describe('Component Tests', () => {

    describe('OrdenRecoleccion Management Delete Component', () => {
        let comp: OrdenRecoleccionDeleteDialogComponent;
        let fixture: ComponentFixture<OrdenRecoleccionDeleteDialogComponent>;
        let service: OrdenRecoleccionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [OrdenRecoleccionDeleteDialogComponent],
                providers: [
                    OrdenRecoleccionService
                ]
            })
            .overrideTemplate(OrdenRecoleccionDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrdenRecoleccionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrdenRecoleccionService);
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
