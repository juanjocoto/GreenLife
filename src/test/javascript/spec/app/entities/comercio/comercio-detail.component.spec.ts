/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GreenlifeTestModule } from '../../../test.module';
import { ComercioDetailComponent } from '../../../../../../main/webapp/app/entities/comercio/comercio-detail.component';
import { ComercioService } from '../../../../../../main/webapp/app/entities/comercio/comercio.service';
import { Comercio } from '../../../../../../main/webapp/app/entities/comercio/comercio.model';

describe('Component Tests', () => {

    describe('Comercio Management Detail Component', () => {
        let comp: ComercioDetailComponent;
        let fixture: ComponentFixture<ComercioDetailComponent>;
        let service: ComercioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [ComercioDetailComponent],
                providers: [
                    ComercioService
                ]
            })
            .overrideTemplate(ComercioDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComercioDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComercioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Comercio(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.comercio).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
