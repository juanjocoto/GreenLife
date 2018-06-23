/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GreenlifeTestModule } from '../../../test.module';
import { OrdenRecoleccionDialogComponent } from '../../../../../../main/webapp/app/entities/orden-recoleccion/orden-recoleccion-dialog.component';
import { OrdenRecoleccionService } from '../../../../../../main/webapp/app/entities/orden-recoleccion/orden-recoleccion.service';
import { OrdenRecoleccion } from '../../../../../../main/webapp/app/entities/orden-recoleccion/orden-recoleccion.model';
import { UsuarioService } from '../../../../../../main/webapp/app/entities/usuario';

describe('Component Tests', () => {

    describe('OrdenRecoleccion Management Dialog Component', () => {
        let comp: OrdenRecoleccionDialogComponent;
        let fixture: ComponentFixture<OrdenRecoleccionDialogComponent>;
        let service: OrdenRecoleccionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [OrdenRecoleccionDialogComponent],
                providers: [
                    UsuarioService,
                    OrdenRecoleccionService
                ]
            })
            .overrideTemplate(OrdenRecoleccionDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrdenRecoleccionDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrdenRecoleccionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OrdenRecoleccion(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.ordenRecoleccion = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ordenRecoleccionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OrdenRecoleccion();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.ordenRecoleccion = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ordenRecoleccionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
