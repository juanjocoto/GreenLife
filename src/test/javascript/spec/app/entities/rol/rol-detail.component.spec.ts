/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GreenlifeTestModule } from '../../../test.module';
import { RolDetailComponent } from '../../../../../../main/webapp/app/entities/rol/rol-detail.component';
import { RolService } from '../../../../../../main/webapp/app/entities/rol/rol.service';
import { Rol } from '../../../../../../main/webapp/app/entities/rol/rol.model';

describe('Component Tests', () => {

    describe('Rol Management Detail Component', () => {
        let comp: RolDetailComponent;
        let fixture: ComponentFixture<RolDetailComponent>;
        let service: RolService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [RolDetailComponent],
                providers: [
                    RolService
                ]
            })
            .overrideTemplate(RolDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RolDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RolService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Rol(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.rol).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
