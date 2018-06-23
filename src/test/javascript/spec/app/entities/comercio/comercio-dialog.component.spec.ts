/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GreenlifeTestModule } from '../../../test.module';
import { ComercioDialogComponent } from '../../../../../../main/webapp/app/entities/comercio/comercio-dialog.component';
import { ComercioService } from '../../../../../../main/webapp/app/entities/comercio/comercio.service';
import { Comercio } from '../../../../../../main/webapp/app/entities/comercio/comercio.model';
import { EtiquetaService } from '../../../../../../main/webapp/app/entities/etiqueta';
import { CategoriaAlimentacionService } from '../../../../../../main/webapp/app/entities/categoria-alimentacion';
import { UsuarioService } from '../../../../../../main/webapp/app/entities/usuario';

describe('Component Tests', () => {

    describe('Comercio Management Dialog Component', () => {
        let comp: ComercioDialogComponent;
        let fixture: ComponentFixture<ComercioDialogComponent>;
        let service: ComercioService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [ComercioDialogComponent],
                providers: [
                    EtiquetaService,
                    CategoriaAlimentacionService,
                    UsuarioService,
                    ComercioService
                ]
            })
            .overrideTemplate(ComercioDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComercioDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComercioService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Comercio(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.comercio = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'comercioListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Comercio();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.comercio = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'comercioListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
