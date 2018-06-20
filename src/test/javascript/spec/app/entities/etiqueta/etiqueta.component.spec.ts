/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreenlifeTestModule } from '../../../test.module';
import { EtiquetaComponent } from '../../../../../../main/webapp/app/entities/etiqueta/etiqueta.component';
import { EtiquetaService } from '../../../../../../main/webapp/app/entities/etiqueta/etiqueta.service';
import { Etiqueta } from '../../../../../../main/webapp/app/entities/etiqueta/etiqueta.model';

describe('Component Tests', () => {

    describe('Etiqueta Management Component', () => {
        let comp: EtiquetaComponent;
        let fixture: ComponentFixture<EtiquetaComponent>;
        let service: EtiquetaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [EtiquetaComponent],
                providers: [
                    EtiquetaService
                ]
            })
            .overrideTemplate(EtiquetaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EtiquetaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EtiquetaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Etiqueta(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.etiquetas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
