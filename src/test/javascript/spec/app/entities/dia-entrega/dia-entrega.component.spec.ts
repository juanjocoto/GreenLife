/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreenlifeTestModule } from '../../../test.module';
import { DiaEntregaComponent } from '../../../../../../main/webapp/app/entities/dia-entrega/dia-entrega.component';
import { DiaEntregaService } from '../../../../../../main/webapp/app/entities/dia-entrega/dia-entrega.service';
import { DiaEntrega } from '../../../../../../main/webapp/app/entities/dia-entrega/dia-entrega.model';

describe('Component Tests', () => {

    describe('DiaEntrega Management Component', () => {
        let comp: DiaEntregaComponent;
        let fixture: ComponentFixture<DiaEntregaComponent>;
        let service: DiaEntregaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [DiaEntregaComponent],
                providers: [
                    DiaEntregaService
                ]
            })
            .overrideTemplate(DiaEntregaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DiaEntregaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiaEntregaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DiaEntrega(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.diaEntregas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
