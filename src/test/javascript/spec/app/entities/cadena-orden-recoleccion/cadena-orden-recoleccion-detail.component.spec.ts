/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GreenlifeTestModule } from '../../../test.module';
import { CadenaOrdenRecoleccionDetailComponent } from '../../../../../../main/webapp/app/entities/cadena-orden-recoleccion/cadena-orden-recoleccion-detail.component';
import { CadenaOrdenRecoleccionService } from '../../../../../../main/webapp/app/entities/cadena-orden-recoleccion/cadena-orden-recoleccion.service';
import { CadenaOrdenRecoleccion } from '../../../../../../main/webapp/app/entities/cadena-orden-recoleccion/cadena-orden-recoleccion.model';

describe('Component Tests', () => {

    describe('CadenaOrdenRecoleccion Management Detail Component', () => {
        let comp: CadenaOrdenRecoleccionDetailComponent;
        let fixture: ComponentFixture<CadenaOrdenRecoleccionDetailComponent>;
        let service: CadenaOrdenRecoleccionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [CadenaOrdenRecoleccionDetailComponent],
                providers: [
                    CadenaOrdenRecoleccionService
                ]
            })
            .overrideTemplate(CadenaOrdenRecoleccionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CadenaOrdenRecoleccionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CadenaOrdenRecoleccionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CadenaOrdenRecoleccion(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cadenaOrdenRecoleccion).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
