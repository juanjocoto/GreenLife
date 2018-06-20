/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GreenlifeTestModule } from '../../../test.module';
import { PermisoDetailComponent } from '../../../../../../main/webapp/app/entities/permiso/permiso-detail.component';
import { PermisoService } from '../../../../../../main/webapp/app/entities/permiso/permiso.service';
import { Permiso } from '../../../../../../main/webapp/app/entities/permiso/permiso.model';

describe('Component Tests', () => {

    describe('Permiso Management Detail Component', () => {
        let comp: PermisoDetailComponent;
        let fixture: ComponentFixture<PermisoDetailComponent>;
        let service: PermisoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [PermisoDetailComponent],
                providers: [
                    PermisoService
                ]
            })
            .overrideTemplate(PermisoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PermisoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PermisoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Permiso(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.permiso).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
