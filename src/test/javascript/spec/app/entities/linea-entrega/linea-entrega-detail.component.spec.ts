/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GreenlifeTestModule } from '../../../test.module';
import { LineaEntregaDetailComponent } from '../../../../../../main/webapp/app/entities/linea-entrega/linea-entrega-detail.component';
import { LineaEntregaService } from '../../../../../../main/webapp/app/entities/linea-entrega/linea-entrega.service';
import { LineaEntrega } from '../../../../../../main/webapp/app/entities/linea-entrega/linea-entrega.model';

describe('Component Tests', () => {

    describe('LineaEntrega Management Detail Component', () => {
        let comp: LineaEntregaDetailComponent;
        let fixture: ComponentFixture<LineaEntregaDetailComponent>;
        let service: LineaEntregaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [LineaEntregaDetailComponent],
                providers: [
                    LineaEntregaService
                ]
            })
            .overrideTemplate(LineaEntregaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LineaEntregaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LineaEntregaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new LineaEntrega(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.lineaEntrega).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
