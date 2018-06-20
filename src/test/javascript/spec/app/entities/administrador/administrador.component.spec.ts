/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreenlifeTestModule } from '../../../test.module';
import { AdministradorComponent } from '../../../../../../main/webapp/app/entities/administrador/administrador.component';
import { AdministradorService } from '../../../../../../main/webapp/app/entities/administrador/administrador.service';
import { Administrador } from '../../../../../../main/webapp/app/entities/administrador/administrador.model';

describe('Component Tests', () => {

    describe('Administrador Management Component', () => {
        let comp: AdministradorComponent;
        let fixture: ComponentFixture<AdministradorComponent>;
        let service: AdministradorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [AdministradorComponent],
                providers: [
                    AdministradorService
                ]
            })
            .overrideTemplate(AdministradorComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AdministradorComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AdministradorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Administrador(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.administradors[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
