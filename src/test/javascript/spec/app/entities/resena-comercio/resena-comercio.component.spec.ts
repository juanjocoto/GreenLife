/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreenlifeTestModule } from '../../../test.module';
import { ResenaComercioComponent } from '../../../../../../main/webapp/app/entities/resena-comercio/resena-comercio.component';
import { ResenaComercioService } from '../../../../../../main/webapp/app/entities/resena-comercio/resena-comercio.service';
import { ResenaComercio } from '../../../../../../main/webapp/app/entities/resena-comercio/resena-comercio.model';

describe('Component Tests', () => {

    describe('ResenaComercio Management Component', () => {
        let comp: ResenaComercioComponent;
        let fixture: ComponentFixture<ResenaComercioComponent>;
        let service: ResenaComercioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [ResenaComercioComponent],
                providers: [
                    ResenaComercioService
                ]
            })
            .overrideTemplate(ResenaComercioComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ResenaComercioComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ResenaComercioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ResenaComercio(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.resenaComercios[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
