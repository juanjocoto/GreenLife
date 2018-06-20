/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreenlifeTestModule } from '../../../test.module';
import { PublicacionComponent } from '../../../../../../main/webapp/app/entities/publicacion/publicacion.component';
import { PublicacionService } from '../../../../../../main/webapp/app/entities/publicacion/publicacion.service';
import { Publicacion } from '../../../../../../main/webapp/app/entities/publicacion/publicacion.model';

describe('Component Tests', () => {

    describe('Publicacion Management Component', () => {
        let comp: PublicacionComponent;
        let fixture: ComponentFixture<PublicacionComponent>;
        let service: PublicacionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [PublicacionComponent],
                providers: [
                    PublicacionService
                ]
            })
            .overrideTemplate(PublicacionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PublicacionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PublicacionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Publicacion(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.publicacions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
