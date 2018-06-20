/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GreenlifeTestModule } from '../../../test.module';
import { ComentarioPublicacionDetailComponent } from '../../../../../../main/webapp/app/entities/comentario-publicacion/comentario-publicacion-detail.component';
import { ComentarioPublicacionService } from '../../../../../../main/webapp/app/entities/comentario-publicacion/comentario-publicacion.service';
import { ComentarioPublicacion } from '../../../../../../main/webapp/app/entities/comentario-publicacion/comentario-publicacion.model';

describe('Component Tests', () => {

    describe('ComentarioPublicacion Management Detail Component', () => {
        let comp: ComentarioPublicacionDetailComponent;
        let fixture: ComponentFixture<ComentarioPublicacionDetailComponent>;
        let service: ComentarioPublicacionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [ComentarioPublicacionDetailComponent],
                providers: [
                    ComentarioPublicacionService
                ]
            })
            .overrideTemplate(ComentarioPublicacionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComentarioPublicacionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComentarioPublicacionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ComentarioPublicacion(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.comentarioPublicacion).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
