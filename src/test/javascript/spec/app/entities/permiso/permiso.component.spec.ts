/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreenlifeTestModule } from '../../../test.module';
import { PermisoComponent } from '../../../../../../main/webapp/app/entities/permiso/permiso.component';
import { PermisoService } from '../../../../../../main/webapp/app/entities/permiso/permiso.service';
import { Permiso } from '../../../../../../main/webapp/app/entities/permiso/permiso.model';

describe('Component Tests', () => {

    describe('Permiso Management Component', () => {
        let comp: PermisoComponent;
        let fixture: ComponentFixture<PermisoComponent>;
        let service: PermisoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [PermisoComponent],
                providers: [
                    PermisoService
                ]
            })
            .overrideTemplate(PermisoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PermisoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PermisoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Permiso(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.permisos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
