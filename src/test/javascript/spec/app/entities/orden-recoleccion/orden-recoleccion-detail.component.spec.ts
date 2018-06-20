/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GreenlifeTestModule } from '../../../test.module';
import { OrdenRecoleccionDetailComponent } from '../../../../../../main/webapp/app/entities/orden-recoleccion/orden-recoleccion-detail.component';
import { OrdenRecoleccionService } from '../../../../../../main/webapp/app/entities/orden-recoleccion/orden-recoleccion.service';
import { OrdenRecoleccion } from '../../../../../../main/webapp/app/entities/orden-recoleccion/orden-recoleccion.model';

describe('Component Tests', () => {

    describe('OrdenRecoleccion Management Detail Component', () => {
        let comp: OrdenRecoleccionDetailComponent;
        let fixture: ComponentFixture<OrdenRecoleccionDetailComponent>;
        let service: OrdenRecoleccionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [OrdenRecoleccionDetailComponent],
                providers: [
                    OrdenRecoleccionService
                ]
            })
            .overrideTemplate(OrdenRecoleccionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrdenRecoleccionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrdenRecoleccionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new OrdenRecoleccion(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ordenRecoleccion).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
