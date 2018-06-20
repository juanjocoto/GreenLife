/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GreenlifeTestModule } from '../../../test.module';
import { ResenaClienteDialogComponent } from '../../../../../../main/webapp/app/entities/resena-cliente/resena-cliente-dialog.component';
import { ResenaClienteService } from '../../../../../../main/webapp/app/entities/resena-cliente/resena-cliente.service';
import { ResenaCliente } from '../../../../../../main/webapp/app/entities/resena-cliente/resena-cliente.model';
import { ComercioService } from '../../../../../../main/webapp/app/entities/comercio';
import { ClienteService } from '../../../../../../main/webapp/app/entities/cliente';

describe('Component Tests', () => {

    describe('ResenaCliente Management Dialog Component', () => {
        let comp: ResenaClienteDialogComponent;
        let fixture: ComponentFixture<ResenaClienteDialogComponent>;
        let service: ResenaClienteService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [ResenaClienteDialogComponent],
                providers: [
                    ComercioService,
                    ClienteService,
                    ResenaClienteService
                ]
            })
            .overrideTemplate(ResenaClienteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ResenaClienteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ResenaClienteService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ResenaCliente(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.resenaCliente = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'resenaClienteListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ResenaCliente();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.resenaCliente = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'resenaClienteListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
