/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreenlifeTestModule } from '../../../test.module';
import { TipoContratoComponent } from '../../../../../../main/webapp/app/entities/tipo-contrato/tipo-contrato.component';
import { TipoContratoService } from '../../../../../../main/webapp/app/entities/tipo-contrato/tipo-contrato.service';
import { TipoContrato } from '../../../../../../main/webapp/app/entities/tipo-contrato/tipo-contrato.model';

describe('Component Tests', () => {

    describe('TipoContrato Management Component', () => {
        let comp: TipoContratoComponent;
        let fixture: ComponentFixture<TipoContratoComponent>;
        let service: TipoContratoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [TipoContratoComponent],
                providers: [
                    TipoContratoService
                ]
            })
            .overrideTemplate(TipoContratoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipoContratoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoContratoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TipoContrato(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tipoContratoes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
