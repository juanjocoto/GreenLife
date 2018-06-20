/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreenlifeTestModule } from '../../../test.module';
import { RolComponent } from '../../../../../../main/webapp/app/entities/rol/rol.component';
import { RolService } from '../../../../../../main/webapp/app/entities/rol/rol.service';
import { Rol } from '../../../../../../main/webapp/app/entities/rol/rol.model';

describe('Component Tests', () => {

    describe('Rol Management Component', () => {
        let comp: RolComponent;
        let fixture: ComponentFixture<RolComponent>;
        let service: RolService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [RolComponent],
                providers: [
                    RolService
                ]
            })
            .overrideTemplate(RolComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RolComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RolService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Rol(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.rols[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
