/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreenlifeTestModule } from '../../../test.module';
import { SuscripcionComponent } from '../../../../../../main/webapp/app/entities/suscripcion/suscripcion.component';
import { SuscripcionService } from '../../../../../../main/webapp/app/entities/suscripcion/suscripcion.service';
import { Suscripcion } from '../../../../../../main/webapp/app/entities/suscripcion/suscripcion.model';

describe('Component Tests', () => {

    describe('Suscripcion Management Component', () => {
        let comp: SuscripcionComponent;
        let fixture: ComponentFixture<SuscripcionComponent>;
        let service: SuscripcionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [SuscripcionComponent],
                providers: [
                    SuscripcionService
                ]
            })
            .overrideTemplate(SuscripcionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SuscripcionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SuscripcionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Suscripcion(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.suscripcions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
