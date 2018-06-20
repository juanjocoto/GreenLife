/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreenlifeTestModule } from '../../../test.module';
import { LineaEntregaComponent } from '../../../../../../main/webapp/app/entities/linea-entrega/linea-entrega.component';
import { LineaEntregaService } from '../../../../../../main/webapp/app/entities/linea-entrega/linea-entrega.service';
import { LineaEntrega } from '../../../../../../main/webapp/app/entities/linea-entrega/linea-entrega.model';

describe('Component Tests', () => {

    describe('LineaEntrega Management Component', () => {
        let comp: LineaEntregaComponent;
        let fixture: ComponentFixture<LineaEntregaComponent>;
        let service: LineaEntregaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [LineaEntregaComponent],
                providers: [
                    LineaEntregaService
                ]
            })
            .overrideTemplate(LineaEntregaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LineaEntregaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LineaEntregaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new LineaEntrega(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.lineaEntregas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
