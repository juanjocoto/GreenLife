/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GreenlifeTestModule } from '../../../test.module';
import { CobroSuscripcionDetailComponent } from '../../../../../../main/webapp/app/entities/cobro-suscripcion/cobro-suscripcion-detail.component';
import { CobroSuscripcionService } from '../../../../../../main/webapp/app/entities/cobro-suscripcion/cobro-suscripcion.service';
import { CobroSuscripcion } from '../../../../../../main/webapp/app/entities/cobro-suscripcion/cobro-suscripcion.model';

describe('Component Tests', () => {

    describe('CobroSuscripcion Management Detail Component', () => {
        let comp: CobroSuscripcionDetailComponent;
        let fixture: ComponentFixture<CobroSuscripcionDetailComponent>;
        let service: CobroSuscripcionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [CobroSuscripcionDetailComponent],
                providers: [
                    CobroSuscripcionService
                ]
            })
            .overrideTemplate(CobroSuscripcionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CobroSuscripcionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CobroSuscripcionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CobroSuscripcion(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cobroSuscripcion).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
