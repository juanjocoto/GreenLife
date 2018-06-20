/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreenlifeTestModule } from '../../../test.module';
import { SolicitudSuscripcionComponent } from '../../../../../../main/webapp/app/entities/solicitud-suscripcion/solicitud-suscripcion.component';
import { SolicitudSuscripcionService } from '../../../../../../main/webapp/app/entities/solicitud-suscripcion/solicitud-suscripcion.service';
import { SolicitudSuscripcion } from '../../../../../../main/webapp/app/entities/solicitud-suscripcion/solicitud-suscripcion.model';

describe('Component Tests', () => {

    describe('SolicitudSuscripcion Management Component', () => {
        let comp: SolicitudSuscripcionComponent;
        let fixture: ComponentFixture<SolicitudSuscripcionComponent>;
        let service: SolicitudSuscripcionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [SolicitudSuscripcionComponent],
                providers: [
                    SolicitudSuscripcionService
                ]
            })
            .overrideTemplate(SolicitudSuscripcionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SolicitudSuscripcionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SolicitudSuscripcionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SolicitudSuscripcion(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.solicitudSuscripcions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
