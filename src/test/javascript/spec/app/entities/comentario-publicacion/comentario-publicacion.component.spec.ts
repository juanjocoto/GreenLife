/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreenlifeTestModule } from '../../../test.module';
import { ComentarioPublicacionComponent } from '../../../../../../main/webapp/app/entities/comentario-publicacion/comentario-publicacion.component';
import { ComentarioPublicacionService } from '../../../../../../main/webapp/app/entities/comentario-publicacion/comentario-publicacion.service';
import { ComentarioPublicacion } from '../../../../../../main/webapp/app/entities/comentario-publicacion/comentario-publicacion.model';

describe('Component Tests', () => {

    describe('ComentarioPublicacion Management Component', () => {
        let comp: ComentarioPublicacionComponent;
        let fixture: ComponentFixture<ComentarioPublicacionComponent>;
        let service: ComentarioPublicacionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [ComentarioPublicacionComponent],
                providers: [
                    ComentarioPublicacionService
                ]
            })
            .overrideTemplate(ComentarioPublicacionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComentarioPublicacionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComentarioPublicacionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ComentarioPublicacion(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.comentarioPublicacions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
