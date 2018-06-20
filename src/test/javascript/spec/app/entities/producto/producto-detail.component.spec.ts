/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GreenlifeTestModule } from '../../../test.module';
import { ProductoDetailComponent } from '../../../../../../main/webapp/app/entities/producto/producto-detail.component';
import { ProductoService } from '../../../../../../main/webapp/app/entities/producto/producto.service';
import { Producto } from '../../../../../../main/webapp/app/entities/producto/producto.model';

describe('Component Tests', () => {

    describe('Producto Management Detail Component', () => {
        let comp: ProductoDetailComponent;
        let fixture: ComponentFixture<ProductoDetailComponent>;
        let service: ProductoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [ProductoDetailComponent],
                providers: [
                    ProductoService
                ]
            })
            .overrideTemplate(ProductoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Producto(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.producto).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
