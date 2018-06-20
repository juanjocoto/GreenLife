/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreenlifeTestModule } from '../../../test.module';
import { LineaProductoComponent } from '../../../../../../main/webapp/app/entities/linea-producto/linea-producto.component';
import { LineaProductoService } from '../../../../../../main/webapp/app/entities/linea-producto/linea-producto.service';
import { LineaProducto } from '../../../../../../main/webapp/app/entities/linea-producto/linea-producto.model';

describe('Component Tests', () => {

    describe('LineaProducto Management Component', () => {
        let comp: LineaProductoComponent;
        let fixture: ComponentFixture<LineaProductoComponent>;
        let service: LineaProductoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [LineaProductoComponent],
                providers: [
                    LineaProductoService
                ]
            })
            .overrideTemplate(LineaProductoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LineaProductoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LineaProductoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new LineaProducto(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.lineaProductos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
