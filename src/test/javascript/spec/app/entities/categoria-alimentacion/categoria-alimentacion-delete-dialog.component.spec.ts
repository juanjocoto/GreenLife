/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GreenlifeTestModule } from '../../../test.module';
import { CategoriaAlimentacionDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/categoria-alimentacion/categoria-alimentacion-delete-dialog.component';
import { CategoriaAlimentacionService } from '../../../../../../main/webapp/app/entities/categoria-alimentacion/categoria-alimentacion.service';

describe('Component Tests', () => {

    describe('CategoriaAlimentacion Management Delete Component', () => {
        let comp: CategoriaAlimentacionDeleteDialogComponent;
        let fixture: ComponentFixture<CategoriaAlimentacionDeleteDialogComponent>;
        let service: CategoriaAlimentacionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [CategoriaAlimentacionDeleteDialogComponent],
                providers: [
                    CategoriaAlimentacionService
                ]
            })
            .overrideTemplate(CategoriaAlimentacionDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CategoriaAlimentacionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoriaAlimentacionService);
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
