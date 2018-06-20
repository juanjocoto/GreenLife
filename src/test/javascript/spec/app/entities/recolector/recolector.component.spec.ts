/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreenlifeTestModule } from '../../../test.module';
import { RecolectorComponent } from '../../../../../../main/webapp/app/entities/recolector/recolector.component';
import { RecolectorService } from '../../../../../../main/webapp/app/entities/recolector/recolector.service';
import { Recolector } from '../../../../../../main/webapp/app/entities/recolector/recolector.model';

describe('Component Tests', () => {

    describe('Recolector Management Component', () => {
        let comp: RecolectorComponent;
        let fixture: ComponentFixture<RecolectorComponent>;
        let service: RecolectorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [RecolectorComponent],
                providers: [
                    RecolectorService
                ]
            })
            .overrideTemplate(RecolectorComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RecolectorComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RecolectorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Recolector(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.recolectors[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
