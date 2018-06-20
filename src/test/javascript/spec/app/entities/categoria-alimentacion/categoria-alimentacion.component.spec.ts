/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreenlifeTestModule } from '../../../test.module';
import { CategoriaAlimentacionComponent } from '../../../../../../main/webapp/app/entities/categoria-alimentacion/categoria-alimentacion.component';
import { CategoriaAlimentacionService } from '../../../../../../main/webapp/app/entities/categoria-alimentacion/categoria-alimentacion.service';
import { CategoriaAlimentacion } from '../../../../../../main/webapp/app/entities/categoria-alimentacion/categoria-alimentacion.model';

describe('Component Tests', () => {

    describe('CategoriaAlimentacion Management Component', () => {
        let comp: CategoriaAlimentacionComponent;
        let fixture: ComponentFixture<CategoriaAlimentacionComponent>;
        let service: CategoriaAlimentacionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [CategoriaAlimentacionComponent],
                providers: [
                    CategoriaAlimentacionService
                ]
            })
            .overrideTemplate(CategoriaAlimentacionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CategoriaAlimentacionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoriaAlimentacionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CategoriaAlimentacion(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.categoriaAlimentacions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
