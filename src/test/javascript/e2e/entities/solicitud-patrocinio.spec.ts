import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('SolicitudPatrocinio e2e test', () => {

    let navBarPage: NavBarPage;
    let solicitudPatrocinioDialogPage: SolicitudPatrocinioDialogPage;
    let solicitudPatrocinioComponentsPage: SolicitudPatrocinioComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load SolicitudPatrocinios', () => {
        navBarPage.goToEntity('solicitud-patrocinio');
        solicitudPatrocinioComponentsPage = new SolicitudPatrocinioComponentsPage();
        expect(solicitudPatrocinioComponentsPage.getTitle())
            .toMatch(/Solicitud Patrocinios/);

    });

    it('should load create SolicitudPatrocinio dialog', () => {
        solicitudPatrocinioComponentsPage.clickOnCreateButton();
        solicitudPatrocinioDialogPage = new SolicitudPatrocinioDialogPage();
        expect(solicitudPatrocinioDialogPage.getModalTitle())
            .toMatch(/Create or edit a Solicitud Patrocinio/);
        solicitudPatrocinioDialogPage.close();
    });

    it('should create and save SolicitudPatrocinios', () => {
        solicitudPatrocinioComponentsPage.clickOnCreateButton();
        solicitudPatrocinioDialogPage.setFechaCreacionInput('2000-12-31');
        expect(solicitudPatrocinioDialogPage.getFechaCreacionInput()).toMatch('2000-12-31');
        solicitudPatrocinioDialogPage.setNombreInput('nombre');
        expect(solicitudPatrocinioDialogPage.getNombreInput()).toMatch('nombre');
        solicitudPatrocinioDialogPage.setCedJuridicaInput('cedJuridica');
        expect(solicitudPatrocinioDialogPage.getCedJuridicaInput()).toMatch('cedJuridica');
        solicitudPatrocinioDialogPage.setCorreoInput('correo');
        expect(solicitudPatrocinioDialogPage.getCorreoInput()).toMatch('correo');
        solicitudPatrocinioDialogPage.setDatosAdicionalesInput('datosAdicionales');
        expect(solicitudPatrocinioDialogPage.getDatosAdicionalesInput()).toMatch('datosAdicionales');
        solicitudPatrocinioDialogPage.save();
        expect(solicitudPatrocinioDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SolicitudPatrocinioComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-solicitud-patrocinio div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class SolicitudPatrocinioDialogPage {
    modalTitle = element(by.css('h4#mySolicitudPatrocinioLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    fechaCreacionInput = element(by.css('input#field_fechaCreacion'));
    nombreInput = element(by.css('input#field_nombre'));
    cedJuridicaInput = element(by.css('input#field_cedJuridica'));
    correoInput = element(by.css('input#field_correo'));
    datosAdicionalesInput = element(by.css('input#field_datosAdicionales'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setFechaCreacionInput = function(fechaCreacion) {
        this.fechaCreacionInput.sendKeys(fechaCreacion);
    };

    getFechaCreacionInput = function() {
        return this.fechaCreacionInput.getAttribute('value');
    };

    setNombreInput = function(nombre) {
        this.nombreInput.sendKeys(nombre);
    };

    getNombreInput = function() {
        return this.nombreInput.getAttribute('value');
    };

    setCedJuridicaInput = function(cedJuridica) {
        this.cedJuridicaInput.sendKeys(cedJuridica);
    };

    getCedJuridicaInput = function() {
        return this.cedJuridicaInput.getAttribute('value');
    };

    setCorreoInput = function(correo) {
        this.correoInput.sendKeys(correo);
    };

    getCorreoInput = function() {
        return this.correoInput.getAttribute('value');
    };

    setDatosAdicionalesInput = function(datosAdicionales) {
        this.datosAdicionalesInput.sendKeys(datosAdicionales);
    };

    getDatosAdicionalesInput = function() {
        return this.datosAdicionalesInput.getAttribute('value');
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
