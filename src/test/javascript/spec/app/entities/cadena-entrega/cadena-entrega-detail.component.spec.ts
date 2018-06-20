/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GreenlifeTestModule } from '../../../test.module';
import { CadenaEntregaDetailComponent } from '../../../../../../main/webapp/app/entities/cadena-entrega/cadena-entrega-detail.component';
import { CadenaEntregaService } from '../../../../../../main/webapp/app/entities/cadena-entrega/cadena-entrega.service';
import { CadenaEntrega } from '../../../../../../main/webapp/app/entities/cadena-entrega/cadena-entrega.model';

describe('Component Tests', () => {

    describe('CadenaEntrega Management Detail Component', () => {
        let comp: CadenaEntregaDetailComponent;
        let fixture: ComponentFixture<CadenaEntregaDetailComponent>;
        let service: CadenaEntregaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [CadenaEntregaDetailComponent],
                providers: [
                    CadenaEntregaService
                ]
            })
            .overrideTemplate(CadenaEntregaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CadenaEntregaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CadenaEntregaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CadenaEntrega(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cadenaEntrega).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
