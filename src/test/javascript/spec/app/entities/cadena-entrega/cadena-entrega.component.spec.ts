/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreenlifeTestModule } from '../../../test.module';
import { CadenaEntregaComponent } from '../../../../../../main/webapp/app/entities/cadena-entrega/cadena-entrega.component';
import { CadenaEntregaService } from '../../../../../../main/webapp/app/entities/cadena-entrega/cadena-entrega.service';
import { CadenaEntrega } from '../../../../../../main/webapp/app/entities/cadena-entrega/cadena-entrega.model';

describe('Component Tests', () => {

    describe('CadenaEntrega Management Component', () => {
        let comp: CadenaEntregaComponent;
        let fixture: ComponentFixture<CadenaEntregaComponent>;
        let service: CadenaEntregaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [CadenaEntregaComponent],
                providers: [
                    CadenaEntregaService
                ]
            })
            .overrideTemplate(CadenaEntregaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CadenaEntregaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CadenaEntregaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CadenaEntrega(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cadenaEntregas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
