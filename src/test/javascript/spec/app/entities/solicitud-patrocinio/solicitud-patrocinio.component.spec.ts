/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreenlifeTestModule } from '../../../test.module';
import { SolicitudPatrocinioComponent } from '../../../../../../main/webapp/app/entities/solicitud-patrocinio/solicitud-patrocinio.component';
import { SolicitudPatrocinioService } from '../../../../../../main/webapp/app/entities/solicitud-patrocinio/solicitud-patrocinio.service';
import { SolicitudPatrocinio } from '../../../../../../main/webapp/app/entities/solicitud-patrocinio/solicitud-patrocinio.model';

describe('Component Tests', () => {

    describe('SolicitudPatrocinio Management Component', () => {
        let comp: SolicitudPatrocinioComponent;
        let fixture: ComponentFixture<SolicitudPatrocinioComponent>;
        let service: SolicitudPatrocinioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [SolicitudPatrocinioComponent],
                providers: [
                    SolicitudPatrocinioService
                ]
            })
            .overrideTemplate(SolicitudPatrocinioComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SolicitudPatrocinioComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SolicitudPatrocinioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SolicitudPatrocinio(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.solicitudPatrocinios[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
