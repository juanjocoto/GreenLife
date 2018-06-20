/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GreenlifeTestModule } from '../../../test.module';
import { CadenaEntregaDialogComponent } from '../../../../../../main/webapp/app/entities/cadena-entrega/cadena-entrega-dialog.component';
import { CadenaEntregaService } from '../../../../../../main/webapp/app/entities/cadena-entrega/cadena-entrega.service';
import { CadenaEntrega } from '../../../../../../main/webapp/app/entities/cadena-entrega/cadena-entrega.model';
import { EntregaService } from '../../../../../../main/webapp/app/entities/entrega';

describe('Component Tests', () => {

    describe('CadenaEntrega Management Dialog Component', () => {
        let comp: CadenaEntregaDialogComponent;
        let fixture: ComponentFixture<CadenaEntregaDialogComponent>;
        let service: CadenaEntregaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [CadenaEntregaDialogComponent],
                providers: [
                    EntregaService,
                    CadenaEntregaService
                ]
            })
            .overrideTemplate(CadenaEntregaDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CadenaEntregaDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CadenaEntregaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CadenaEntrega(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cadenaEntrega = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cadenaEntregaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CadenaEntrega();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cadenaEntrega = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cadenaEntregaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
