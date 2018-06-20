/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreenlifeTestModule } from '../../../test.module';
import { ConfiguracionComponent } from '../../../../../../main/webapp/app/entities/configuracion/configuracion.component';
import { ConfiguracionService } from '../../../../../../main/webapp/app/entities/configuracion/configuracion.service';
import { Configuracion } from '../../../../../../main/webapp/app/entities/configuracion/configuracion.model';

describe('Component Tests', () => {

    describe('Configuracion Management Component', () => {
        let comp: ConfiguracionComponent;
        let fixture: ComponentFixture<ConfiguracionComponent>;
        let service: ConfiguracionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [ConfiguracionComponent],
                providers: [
                    ConfiguracionService
                ]
            })
            .overrideTemplate(ConfiguracionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ConfiguracionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConfiguracionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Configuracion(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.configuracions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
