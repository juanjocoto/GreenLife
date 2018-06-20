/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreenlifeTestModule } from '../../../test.module';
import { ComercioComponent } from '../../../../../../main/webapp/app/entities/comercio/comercio.component';
import { ComercioService } from '../../../../../../main/webapp/app/entities/comercio/comercio.service';
import { Comercio } from '../../../../../../main/webapp/app/entities/comercio/comercio.model';

describe('Component Tests', () => {

    describe('Comercio Management Component', () => {
        let comp: ComercioComponent;
        let fixture: ComponentFixture<ComercioComponent>;
        let service: ComercioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [ComercioComponent],
                providers: [
                    ComercioService
                ]
            })
            .overrideTemplate(ComercioComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComercioComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComercioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Comercio(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.comercios[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
