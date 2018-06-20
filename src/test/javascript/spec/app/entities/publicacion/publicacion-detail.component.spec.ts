/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GreenlifeTestModule } from '../../../test.module';
import { PublicacionDetailComponent } from '../../../../../../main/webapp/app/entities/publicacion/publicacion-detail.component';
import { PublicacionService } from '../../../../../../main/webapp/app/entities/publicacion/publicacion.service';
import { Publicacion } from '../../../../../../main/webapp/app/entities/publicacion/publicacion.model';

describe('Component Tests', () => {

    describe('Publicacion Management Detail Component', () => {
        let comp: PublicacionDetailComponent;
        let fixture: ComponentFixture<PublicacionDetailComponent>;
        let service: PublicacionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [PublicacionDetailComponent],
                providers: [
                    PublicacionService
                ]
            })
            .overrideTemplate(PublicacionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PublicacionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PublicacionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Publicacion(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.publicacion).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
