/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GreenlifeTestModule } from '../../../test.module';
import { LocalDetailComponent } from '../../../../../../main/webapp/app/entities/local/local-detail.component';
import { LocalService } from '../../../../../../main/webapp/app/entities/local/local.service';
import { Local } from '../../../../../../main/webapp/app/entities/local/local.model';

describe('Component Tests', () => {

    describe('Local Management Detail Component', () => {
        let comp: LocalDetailComponent;
        let fixture: ComponentFixture<LocalDetailComponent>;
        let service: LocalService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [LocalDetailComponent],
                providers: [
                    LocalService
                ]
            })
            .overrideTemplate(LocalDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LocalDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LocalService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Local(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.local).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
