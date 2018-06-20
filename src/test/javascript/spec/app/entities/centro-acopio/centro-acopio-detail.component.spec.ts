/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GreenlifeTestModule } from '../../../test.module';
import { CentroAcopioDetailComponent } from '../../../../../../main/webapp/app/entities/centro-acopio/centro-acopio-detail.component';
import { CentroAcopioService } from '../../../../../../main/webapp/app/entities/centro-acopio/centro-acopio.service';
import { CentroAcopio } from '../../../../../../main/webapp/app/entities/centro-acopio/centro-acopio.model';

describe('Component Tests', () => {

    describe('CentroAcopio Management Detail Component', () => {
        let comp: CentroAcopioDetailComponent;
        let fixture: ComponentFixture<CentroAcopioDetailComponent>;
        let service: CentroAcopioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [CentroAcopioDetailComponent],
                providers: [
                    CentroAcopioService
                ]
            })
            .overrideTemplate(CentroAcopioDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CentroAcopioDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CentroAcopioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CentroAcopio(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.centroAcopio).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
