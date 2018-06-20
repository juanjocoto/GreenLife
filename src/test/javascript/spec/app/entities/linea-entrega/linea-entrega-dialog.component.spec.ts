/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GreenlifeTestModule } from '../../../test.module';
import { LineaEntregaDialogComponent } from '../../../../../../main/webapp/app/entities/linea-entrega/linea-entrega-dialog.component';
import { LineaEntregaService } from '../../../../../../main/webapp/app/entities/linea-entrega/linea-entrega.service';
import { LineaEntrega } from '../../../../../../main/webapp/app/entities/linea-entrega/linea-entrega.model';
import { ProductoService } from '../../../../../../main/webapp/app/entities/producto';
import { EntregaService } from '../../../../../../main/webapp/app/entities/entrega';

describe('Component Tests', () => {

    describe('LineaEntrega Management Dialog Component', () => {
        let comp: LineaEntregaDialogComponent;
        let fixture: ComponentFixture<LineaEntregaDialogComponent>;
        let service: LineaEntregaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [LineaEntregaDialogComponent],
                providers: [
                    ProductoService,
                    EntregaService,
                    LineaEntregaService
                ]
            })
            .overrideTemplate(LineaEntregaDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LineaEntregaDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LineaEntregaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new LineaEntrega(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.lineaEntrega = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'lineaEntregaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new LineaEntrega();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.lineaEntrega = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'lineaEntregaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
