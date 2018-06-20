/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreenlifeTestModule } from '../../../test.module';
import { PatrocinadorComponent } from '../../../../../../main/webapp/app/entities/patrocinador/patrocinador.component';
import { PatrocinadorService } from '../../../../../../main/webapp/app/entities/patrocinador/patrocinador.service';
import { Patrocinador } from '../../../../../../main/webapp/app/entities/patrocinador/patrocinador.model';

describe('Component Tests', () => {

    describe('Patrocinador Management Component', () => {
        let comp: PatrocinadorComponent;
        let fixture: ComponentFixture<PatrocinadorComponent>;
        let service: PatrocinadorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [PatrocinadorComponent],
                providers: [
                    PatrocinadorService
                ]
            })
            .overrideTemplate(PatrocinadorComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PatrocinadorComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PatrocinadorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Patrocinador(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.patrocinadors[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
