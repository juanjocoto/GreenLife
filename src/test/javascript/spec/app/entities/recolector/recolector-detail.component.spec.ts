/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GreenlifeTestModule } from '../../../test.module';
import { RecolectorDetailComponent } from '../../../../../../main/webapp/app/entities/recolector/recolector-detail.component';
import { RecolectorService } from '../../../../../../main/webapp/app/entities/recolector/recolector.service';
import { Recolector } from '../../../../../../main/webapp/app/entities/recolector/recolector.model';

describe('Component Tests', () => {

    describe('Recolector Management Detail Component', () => {
        let comp: RecolectorDetailComponent;
        let fixture: ComponentFixture<RecolectorDetailComponent>;
        let service: RecolectorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [RecolectorDetailComponent],
                providers: [
                    RecolectorService
                ]
            })
            .overrideTemplate(RecolectorDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RecolectorDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RecolectorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Recolector(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.recolector).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
