/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GreenlifeTestModule } from '../../../test.module';
import { SolicitudPatrocinioDetailComponent } from '../../../../../../main/webapp/app/entities/solicitud-patrocinio/solicitud-patrocinio-detail.component';
import { SolicitudPatrocinioService } from '../../../../../../main/webapp/app/entities/solicitud-patrocinio/solicitud-patrocinio.service';
import { SolicitudPatrocinio } from '../../../../../../main/webapp/app/entities/solicitud-patrocinio/solicitud-patrocinio.model';

describe('Component Tests', () => {

    describe('SolicitudPatrocinio Management Detail Component', () => {
        let comp: SolicitudPatrocinioDetailComponent;
        let fixture: ComponentFixture<SolicitudPatrocinioDetailComponent>;
        let service: SolicitudPatrocinioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [SolicitudPatrocinioDetailComponent],
                providers: [
                    SolicitudPatrocinioService
                ]
            })
            .overrideTemplate(SolicitudPatrocinioDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SolicitudPatrocinioDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SolicitudPatrocinioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SolicitudPatrocinio(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.solicitudPatrocinio).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
