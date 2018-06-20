/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GreenlifeTestModule } from '../../../test.module';
import { ConfiguracionDetailComponent } from '../../../../../../main/webapp/app/entities/configuracion/configuracion-detail.component';
import { ConfiguracionService } from '../../../../../../main/webapp/app/entities/configuracion/configuracion.service';
import { Configuracion } from '../../../../../../main/webapp/app/entities/configuracion/configuracion.model';

describe('Component Tests', () => {

    describe('Configuracion Management Detail Component', () => {
        let comp: ConfiguracionDetailComponent;
        let fixture: ComponentFixture<ConfiguracionDetailComponent>;
        let service: ConfiguracionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [ConfiguracionDetailComponent],
                providers: [
                    ConfiguracionService
                ]
            })
            .overrideTemplate(ConfiguracionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ConfiguracionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConfiguracionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Configuracion(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.configuracion).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
