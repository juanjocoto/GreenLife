/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreenlifeTestModule } from '../../../test.module';
import { CentroAcopioComponent } from '../../../../../../main/webapp/app/entities/centro-acopio/centro-acopio.component';
import { CentroAcopioService } from '../../../../../../main/webapp/app/entities/centro-acopio/centro-acopio.service';
import { CentroAcopio } from '../../../../../../main/webapp/app/entities/centro-acopio/centro-acopio.model';

describe('Component Tests', () => {

    describe('CentroAcopio Management Component', () => {
        let comp: CentroAcopioComponent;
        let fixture: ComponentFixture<CentroAcopioComponent>;
        let service: CentroAcopioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [CentroAcopioComponent],
                providers: [
                    CentroAcopioService
                ]
            })
            .overrideTemplate(CentroAcopioComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CentroAcopioComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CentroAcopioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CentroAcopio(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.centroAcopios[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
