/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreenlifeTestModule } from '../../../test.module';
import { ResenaClienteComponent } from '../../../../../../main/webapp/app/entities/resena-cliente/resena-cliente.component';
import { ResenaClienteService } from '../../../../../../main/webapp/app/entities/resena-cliente/resena-cliente.service';
import { ResenaCliente } from '../../../../../../main/webapp/app/entities/resena-cliente/resena-cliente.model';

describe('Component Tests', () => {

    describe('ResenaCliente Management Component', () => {
        let comp: ResenaClienteComponent;
        let fixture: ComponentFixture<ResenaClienteComponent>;
        let service: ResenaClienteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [ResenaClienteComponent],
                providers: [
                    ResenaClienteService
                ]
            })
            .overrideTemplate(ResenaClienteComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ResenaClienteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ResenaClienteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ResenaCliente(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.resenaClientes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
