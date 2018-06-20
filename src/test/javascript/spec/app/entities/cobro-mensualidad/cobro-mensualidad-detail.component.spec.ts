/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GreenlifeTestModule } from '../../../test.module';
import { CobroMensualidadDetailComponent } from '../../../../../../main/webapp/app/entities/cobro-mensualidad/cobro-mensualidad-detail.component';
import { CobroMensualidadService } from '../../../../../../main/webapp/app/entities/cobro-mensualidad/cobro-mensualidad.service';
import { CobroMensualidad } from '../../../../../../main/webapp/app/entities/cobro-mensualidad/cobro-mensualidad.model';

describe('Component Tests', () => {

    describe('CobroMensualidad Management Detail Component', () => {
        let comp: CobroMensualidadDetailComponent;
        let fixture: ComponentFixture<CobroMensualidadDetailComponent>;
        let service: CobroMensualidadService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [CobroMensualidadDetailComponent],
                providers: [
                    CobroMensualidadService
                ]
            })
            .overrideTemplate(CobroMensualidadDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CobroMensualidadDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CobroMensualidadService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CobroMensualidad(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cobroMensualidad).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
