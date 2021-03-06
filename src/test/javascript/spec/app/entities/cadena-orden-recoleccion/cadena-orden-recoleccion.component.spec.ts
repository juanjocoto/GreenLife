/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreenlifeTestModule } from '../../../test.module';
import { CadenaOrdenRecoleccionComponent } from '../../../../../../main/webapp/app/entities/cadena-orden-recoleccion/cadena-orden-recoleccion.component';
import { CadenaOrdenRecoleccionService } from '../../../../../../main/webapp/app/entities/cadena-orden-recoleccion/cadena-orden-recoleccion.service';
import { CadenaOrdenRecoleccion } from '../../../../../../main/webapp/app/entities/cadena-orden-recoleccion/cadena-orden-recoleccion.model';

describe('Component Tests', () => {

    describe('CadenaOrdenRecoleccion Management Component', () => {
        let comp: CadenaOrdenRecoleccionComponent;
        let fixture: ComponentFixture<CadenaOrdenRecoleccionComponent>;
        let service: CadenaOrdenRecoleccionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [CadenaOrdenRecoleccionComponent],
                providers: [
                    CadenaOrdenRecoleccionService
                ]
            })
            .overrideTemplate(CadenaOrdenRecoleccionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CadenaOrdenRecoleccionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CadenaOrdenRecoleccionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CadenaOrdenRecoleccion(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cadenaOrdenRecoleccions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
