/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GreenlifeTestModule } from '../../../test.module';
import { EtiquetaDetailComponent } from '../../../../../../main/webapp/app/entities/etiqueta/etiqueta-detail.component';
import { EtiquetaService } from '../../../../../../main/webapp/app/entities/etiqueta/etiqueta.service';
import { Etiqueta } from '../../../../../../main/webapp/app/entities/etiqueta/etiqueta.model';

describe('Component Tests', () => {

    describe('Etiqueta Management Detail Component', () => {
        let comp: EtiquetaDetailComponent;
        let fixture: ComponentFixture<EtiquetaDetailComponent>;
        let service: EtiquetaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [EtiquetaDetailComponent],
                providers: [
                    EtiquetaService
                ]
            })
            .overrideTemplate(EtiquetaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EtiquetaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EtiquetaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Etiqueta(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.etiqueta).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
