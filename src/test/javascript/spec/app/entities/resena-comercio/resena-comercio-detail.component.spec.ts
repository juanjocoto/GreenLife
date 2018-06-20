/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GreenlifeTestModule } from '../../../test.module';
import { ResenaComercioDetailComponent } from '../../../../../../main/webapp/app/entities/resena-comercio/resena-comercio-detail.component';
import { ResenaComercioService } from '../../../../../../main/webapp/app/entities/resena-comercio/resena-comercio.service';
import { ResenaComercio } from '../../../../../../main/webapp/app/entities/resena-comercio/resena-comercio.model';

describe('Component Tests', () => {

    describe('ResenaComercio Management Detail Component', () => {
        let comp: ResenaComercioDetailComponent;
        let fixture: ComponentFixture<ResenaComercioDetailComponent>;
        let service: ResenaComercioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [ResenaComercioDetailComponent],
                providers: [
                    ResenaComercioService
                ]
            })
            .overrideTemplate(ResenaComercioDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ResenaComercioDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ResenaComercioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ResenaComercio(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.resenaComercio).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
