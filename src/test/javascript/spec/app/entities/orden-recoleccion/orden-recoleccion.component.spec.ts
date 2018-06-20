/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreenlifeTestModule } from '../../../test.module';
import { OrdenRecoleccionComponent } from '../../../../../../main/webapp/app/entities/orden-recoleccion/orden-recoleccion.component';
import { OrdenRecoleccionService } from '../../../../../../main/webapp/app/entities/orden-recoleccion/orden-recoleccion.service';
import { OrdenRecoleccion } from '../../../../../../main/webapp/app/entities/orden-recoleccion/orden-recoleccion.model';

describe('Component Tests', () => {

    describe('OrdenRecoleccion Management Component', () => {
        let comp: OrdenRecoleccionComponent;
        let fixture: ComponentFixture<OrdenRecoleccionComponent>;
        let service: OrdenRecoleccionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [OrdenRecoleccionComponent],
                providers: [
                    OrdenRecoleccionService
                ]
            })
            .overrideTemplate(OrdenRecoleccionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrdenRecoleccionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrdenRecoleccionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new OrdenRecoleccion(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ordenRecoleccions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
