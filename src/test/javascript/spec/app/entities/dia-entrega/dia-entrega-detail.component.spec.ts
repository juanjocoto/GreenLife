/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GreenlifeTestModule } from '../../../test.module';
import { DiaEntregaDetailComponent } from '../../../../../../main/webapp/app/entities/dia-entrega/dia-entrega-detail.component';
import { DiaEntregaService } from '../../../../../../main/webapp/app/entities/dia-entrega/dia-entrega.service';
import { DiaEntrega } from '../../../../../../main/webapp/app/entities/dia-entrega/dia-entrega.model';

describe('Component Tests', () => {

    describe('DiaEntrega Management Detail Component', () => {
        let comp: DiaEntregaDetailComponent;
        let fixture: ComponentFixture<DiaEntregaDetailComponent>;
        let service: DiaEntregaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [DiaEntregaDetailComponent],
                providers: [
                    DiaEntregaService
                ]
            })
            .overrideTemplate(DiaEntregaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DiaEntregaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiaEntregaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DiaEntrega(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.diaEntrega).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
