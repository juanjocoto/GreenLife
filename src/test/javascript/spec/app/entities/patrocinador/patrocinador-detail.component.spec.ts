/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GreenlifeTestModule } from '../../../test.module';
import { PatrocinadorDetailComponent } from '../../../../../../main/webapp/app/entities/patrocinador/patrocinador-detail.component';
import { PatrocinadorService } from '../../../../../../main/webapp/app/entities/patrocinador/patrocinador.service';
import { Patrocinador } from '../../../../../../main/webapp/app/entities/patrocinador/patrocinador.model';

describe('Component Tests', () => {

    describe('Patrocinador Management Detail Component', () => {
        let comp: PatrocinadorDetailComponent;
        let fixture: ComponentFixture<PatrocinadorDetailComponent>;
        let service: PatrocinadorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [PatrocinadorDetailComponent],
                providers: [
                    PatrocinadorService
                ]
            })
            .overrideTemplate(PatrocinadorDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PatrocinadorDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PatrocinadorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Patrocinador(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.patrocinador).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
