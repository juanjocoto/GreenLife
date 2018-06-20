/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GreenlifeTestModule } from '../../../test.module';
import { LineaProductoDetailComponent } from '../../../../../../main/webapp/app/entities/linea-producto/linea-producto-detail.component';
import { LineaProductoService } from '../../../../../../main/webapp/app/entities/linea-producto/linea-producto.service';
import { LineaProducto } from '../../../../../../main/webapp/app/entities/linea-producto/linea-producto.model';

describe('Component Tests', () => {

    describe('LineaProducto Management Detail Component', () => {
        let comp: LineaProductoDetailComponent;
        let fixture: ComponentFixture<LineaProductoDetailComponent>;
        let service: LineaProductoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [LineaProductoDetailComponent],
                providers: [
                    LineaProductoService
                ]
            })
            .overrideTemplate(LineaProductoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LineaProductoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LineaProductoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new LineaProducto(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.lineaProducto).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
