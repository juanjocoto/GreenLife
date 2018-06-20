/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreenlifeTestModule } from '../../../test.module';
import { PagoComponent } from '../../../../../../main/webapp/app/entities/pago/pago.component';
import { PagoService } from '../../../../../../main/webapp/app/entities/pago/pago.service';
import { Pago } from '../../../../../../main/webapp/app/entities/pago/pago.model';

describe('Component Tests', () => {

    describe('Pago Management Component', () => {
        let comp: PagoComponent;
        let fixture: ComponentFixture<PagoComponent>;
        let service: PagoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [PagoComponent],
                providers: [
                    PagoService
                ]
            })
            .overrideTemplate(PagoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PagoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PagoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Pago(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.pagos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
