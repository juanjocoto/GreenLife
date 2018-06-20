/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GreenlifeTestModule } from '../../../test.module';
import { PagoDetailComponent } from '../../../../../../main/webapp/app/entities/pago/pago-detail.component';
import { PagoService } from '../../../../../../main/webapp/app/entities/pago/pago.service';
import { Pago } from '../../../../../../main/webapp/app/entities/pago/pago.model';

describe('Component Tests', () => {

    describe('Pago Management Detail Component', () => {
        let comp: PagoDetailComponent;
        let fixture: ComponentFixture<PagoDetailComponent>;
        let service: PagoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [PagoDetailComponent],
                providers: [
                    PagoService
                ]
            })
            .overrideTemplate(PagoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PagoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PagoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Pago(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.pago).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
