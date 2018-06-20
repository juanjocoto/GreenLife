/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GreenlifeTestModule } from '../../../test.module';
import { SolicitudSuscripcionDetailComponent } from '../../../../../../main/webapp/app/entities/solicitud-suscripcion/solicitud-suscripcion-detail.component';
import { SolicitudSuscripcionService } from '../../../../../../main/webapp/app/entities/solicitud-suscripcion/solicitud-suscripcion.service';
import { SolicitudSuscripcion } from '../../../../../../main/webapp/app/entities/solicitud-suscripcion/solicitud-suscripcion.model';

describe('Component Tests', () => {

    describe('SolicitudSuscripcion Management Detail Component', () => {
        let comp: SolicitudSuscripcionDetailComponent;
        let fixture: ComponentFixture<SolicitudSuscripcionDetailComponent>;
        let service: SolicitudSuscripcionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [SolicitudSuscripcionDetailComponent],
                providers: [
                    SolicitudSuscripcionService
                ]
            })
            .overrideTemplate(SolicitudSuscripcionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SolicitudSuscripcionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SolicitudSuscripcionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SolicitudSuscripcion(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.solicitudSuscripcion).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
