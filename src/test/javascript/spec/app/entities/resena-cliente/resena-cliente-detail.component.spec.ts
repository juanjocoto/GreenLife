/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GreenlifeTestModule } from '../../../test.module';
import { ResenaClienteDetailComponent } from '../../../../../../main/webapp/app/entities/resena-cliente/resena-cliente-detail.component';
import { ResenaClienteService } from '../../../../../../main/webapp/app/entities/resena-cliente/resena-cliente.service';
import { ResenaCliente } from '../../../../../../main/webapp/app/entities/resena-cliente/resena-cliente.model';

describe('Component Tests', () => {

    describe('ResenaCliente Management Detail Component', () => {
        let comp: ResenaClienteDetailComponent;
        let fixture: ComponentFixture<ResenaClienteDetailComponent>;
        let service: ResenaClienteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [ResenaClienteDetailComponent],
                providers: [
                    ResenaClienteService
                ]
            })
            .overrideTemplate(ResenaClienteDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ResenaClienteDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ResenaClienteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ResenaCliente(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.resenaCliente).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
