/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreenlifeTestModule } from '../../../test.module';
import { FotografiaComponent } from '../../../../../../main/webapp/app/entities/fotografia/fotografia.component';
import { FotografiaService } from '../../../../../../main/webapp/app/entities/fotografia/fotografia.service';
import { Fotografia } from '../../../../../../main/webapp/app/entities/fotografia/fotografia.model';

describe('Component Tests', () => {

    describe('Fotografia Management Component', () => {
        let comp: FotografiaComponent;
        let fixture: ComponentFixture<FotografiaComponent>;
        let service: FotografiaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [FotografiaComponent],
                providers: [
                    FotografiaService
                ]
            })
            .overrideTemplate(FotografiaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FotografiaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FotografiaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Fotografia(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.fotografias[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
