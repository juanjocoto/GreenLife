/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GreenlifeTestModule } from '../../../test.module';
import { FotografiaDetailComponent } from '../../../../../../main/webapp/app/entities/fotografia/fotografia-detail.component';
import { FotografiaService } from '../../../../../../main/webapp/app/entities/fotografia/fotografia.service';
import { Fotografia } from '../../../../../../main/webapp/app/entities/fotografia/fotografia.model';

describe('Component Tests', () => {

    describe('Fotografia Management Detail Component', () => {
        let comp: FotografiaDetailComponent;
        let fixture: ComponentFixture<FotografiaDetailComponent>;
        let service: FotografiaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [FotografiaDetailComponent],
                providers: [
                    FotografiaService
                ]
            })
            .overrideTemplate(FotografiaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FotografiaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FotografiaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Fotografia(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.fotografia).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
