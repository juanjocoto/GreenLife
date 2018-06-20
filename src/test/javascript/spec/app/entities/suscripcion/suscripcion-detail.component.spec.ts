/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GreenlifeTestModule } from '../../../test.module';
import { SuscripcionDetailComponent } from '../../../../../../main/webapp/app/entities/suscripcion/suscripcion-detail.component';
import { SuscripcionService } from '../../../../../../main/webapp/app/entities/suscripcion/suscripcion.service';
import { Suscripcion } from '../../../../../../main/webapp/app/entities/suscripcion/suscripcion.model';

describe('Component Tests', () => {

    describe('Suscripcion Management Detail Component', () => {
        let comp: SuscripcionDetailComponent;
        let fixture: ComponentFixture<SuscripcionDetailComponent>;
        let service: SuscripcionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [SuscripcionDetailComponent],
                providers: [
                    SuscripcionService
                ]
            })
            .overrideTemplate(SuscripcionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SuscripcionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SuscripcionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Suscripcion(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.suscripcion).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
