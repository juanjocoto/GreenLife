/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreenlifeTestModule } from '../../../test.module';
import { CobroMensualidadComponent } from '../../../../../../main/webapp/app/entities/cobro-mensualidad/cobro-mensualidad.component';
import { CobroMensualidadService } from '../../../../../../main/webapp/app/entities/cobro-mensualidad/cobro-mensualidad.service';
import { CobroMensualidad } from '../../../../../../main/webapp/app/entities/cobro-mensualidad/cobro-mensualidad.model';

describe('Component Tests', () => {

    describe('CobroMensualidad Management Component', () => {
        let comp: CobroMensualidadComponent;
        let fixture: ComponentFixture<CobroMensualidadComponent>;
        let service: CobroMensualidadService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [CobroMensualidadComponent],
                providers: [
                    CobroMensualidadService
                ]
            })
            .overrideTemplate(CobroMensualidadComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CobroMensualidadComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CobroMensualidadService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CobroMensualidad(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cobroMensualidads[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
