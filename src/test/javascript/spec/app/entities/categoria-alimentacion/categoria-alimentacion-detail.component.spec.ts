/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GreenlifeTestModule } from '../../../test.module';
import { CategoriaAlimentacionDetailComponent } from '../../../../../../main/webapp/app/entities/categoria-alimentacion/categoria-alimentacion-detail.component';
import { CategoriaAlimentacionService } from '../../../../../../main/webapp/app/entities/categoria-alimentacion/categoria-alimentacion.service';
import { CategoriaAlimentacion } from '../../../../../../main/webapp/app/entities/categoria-alimentacion/categoria-alimentacion.model';

describe('Component Tests', () => {

    describe('CategoriaAlimentacion Management Detail Component', () => {
        let comp: CategoriaAlimentacionDetailComponent;
        let fixture: ComponentFixture<CategoriaAlimentacionDetailComponent>;
        let service: CategoriaAlimentacionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [CategoriaAlimentacionDetailComponent],
                providers: [
                    CategoriaAlimentacionService
                ]
            })
            .overrideTemplate(CategoriaAlimentacionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CategoriaAlimentacionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoriaAlimentacionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CategoriaAlimentacion(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.categoriaAlimentacion).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
