/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GreenlifeTestModule } from '../../../test.module';
import { CadenaOrdenRecoleccionDialogComponent } from '../../../../../../main/webapp/app/entities/cadena-orden-recoleccion/cadena-orden-recoleccion-dialog.component';
import { CadenaOrdenRecoleccionService } from '../../../../../../main/webapp/app/entities/cadena-orden-recoleccion/cadena-orden-recoleccion.service';
import { CadenaOrdenRecoleccion } from '../../../../../../main/webapp/app/entities/cadena-orden-recoleccion/cadena-orden-recoleccion.model';
import { OrdenRecoleccionService } from '../../../../../../main/webapp/app/entities/orden-recoleccion';

describe('Component Tests', () => {

    describe('CadenaOrdenRecoleccion Management Dialog Component', () => {
        let comp: CadenaOrdenRecoleccionDialogComponent;
        let fixture: ComponentFixture<CadenaOrdenRecoleccionDialogComponent>;
        let service: CadenaOrdenRecoleccionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [CadenaOrdenRecoleccionDialogComponent],
                providers: [
                    OrdenRecoleccionService,
                    CadenaOrdenRecoleccionService
                ]
            })
            .overrideTemplate(CadenaOrdenRecoleccionDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CadenaOrdenRecoleccionDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CadenaOrdenRecoleccionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CadenaOrdenRecoleccion(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cadenaOrdenRecoleccion = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cadenaOrdenRecoleccionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CadenaOrdenRecoleccion();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cadenaOrdenRecoleccion = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cadenaOrdenRecoleccionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
