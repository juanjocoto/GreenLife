/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreenlifeTestModule } from '../../../test.module';
import { CobroSuscripcionComponent } from '../../../../../../main/webapp/app/entities/cobro-suscripcion/cobro-suscripcion.component';
import { CobroSuscripcionService } from '../../../../../../main/webapp/app/entities/cobro-suscripcion/cobro-suscripcion.service';
import { CobroSuscripcion } from '../../../../../../main/webapp/app/entities/cobro-suscripcion/cobro-suscripcion.model';

describe('Component Tests', () => {

    describe('CobroSuscripcion Management Component', () => {
        let comp: CobroSuscripcionComponent;
        let fixture: ComponentFixture<CobroSuscripcionComponent>;
        let service: CobroSuscripcionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [CobroSuscripcionComponent],
                providers: [
                    CobroSuscripcionService
                ]
            })
            .overrideTemplate(CobroSuscripcionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CobroSuscripcionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CobroSuscripcionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CobroSuscripcion(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cobroSuscripcions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
