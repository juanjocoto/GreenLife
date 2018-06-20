import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('CentroAcopio e2e test', () => {

    let navBarPage: NavBarPage;
    let centroAcopioDialogPage: CentroAcopioDialogPage;
    let centroAcopioComponentsPage: CentroAcopioComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CentroAcopios', () => {
        navBarPage.goToEntity('centro-acopio');
        centroAcopioComponentsPage = new CentroAcopioComponentsPage();
        expect(centroAcopioComponentsPage.getTitle())
            .toMatch(/Centro Acopios/);

    });

    it('should load create CentroAcopio dialog', () => {
        centroAcopioComponentsPage.clickOnCreateButton();
        centroAcopioDialogPage = new CentroAcopioDialogPage();
        expect(centroAcopioDialogPage.getModalTitle())
            .toMatch(/Create or edit a Centro Acopio/);
        centroAcopioDialogPage.close();
    });

    it('should create and save CentroAcopios', () => {
        centroAcopioComponentsPage.clickOnCreateButton();
        centroAcopioDialogPage.setFechaCreacionInput('2000-12-31');
        expect(centroAcopioDialogPage.getFechaCreacionInput()).toMatch('2000-12-31');
        centroAcopioDialogPage.setNombreInput('nombre');
        expect(centroAcopioDialogPage.getNombreInput()).toMatch('nombre');
        centroAcopioDialogPage.setTelefonoInput('telefono');
        expect(centroAcopioDialogPage.getTelefonoInput()).toMatch('telefono');
        centroAcopioDialogPage.setDireccionInput('direccion');
        expect(centroAcopioDialogPage.getDireccionInput()).toMatch('direccion');
        centroAcopioDialogPage.setLatitudInput('5');
        expect(centroAcopioDialogPage.getLatitudInput()).toMatch('5');
        centroAcopioDialogPage.setLongitudInput('5');
        expect(centroAcopioDialogPage.getLongitudInput()).toMatch('5');
        centroAcopioDialogPage.setSitioWebInput('sitioWeb');
        expect(centroAcopioDialogPage.getSitioWebInput()).toMatch('sitioWeb');
        centroAcopioDialogPage.setCorreoInput('correo');
        expect(centroAcopioDialogPage.getCorreoInput()).toMatch('correo');
        centroAcopioDialogPage.save();
        expect(centroAcopioDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CentroAcopioComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-centro-acopio div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class CentroAcopioDialogPage {
    modalTitle = element(by.css('h4#myCentroAcopioLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    fechaCreacionInput = element(by.css('input#field_fechaCreacion'));
    nombreInput = element(by.css('input#field_nombre'));
    telefonoInput = element(by.css('input#field_telefono'));
    direccionInput = element(by.css('input#field_direccion'));
    latitudInput = element(by.css('input#field_latitud'));
    longitudInput = element(by.css('input#field_longitud'));
    sitioWebInput = element(by.css('input#field_sitioWeb'));
    correoInput = element(by.css('input#field_correo'));

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

    setTelefonoInput = function(telefono) {
        this.telefonoInput.sendKeys(telefono);
    };

    getTelefonoInput = function() {
        return this.telefonoInput.getAttribute('value');
    };

    setDireccionInput = function(direccion) {
        this.direccionInput.sendKeys(direccion);
    };

    getDireccionInput = function() {
        return this.direccionInput.getAttribute('value');
    };

    setLatitudInput = function(latitud) {
        this.latitudInput.sendKeys(latitud);
    };

    getLatitudInput = function() {
        return this.latitudInput.getAttribute('value');
    };

    setLongitudInput = function(longitud) {
        this.longitudInput.sendKeys(longitud);
    };

    getLongitudInput = function() {
        return this.longitudInput.getAttribute('value');
    };

    setSitioWebInput = function(sitioWeb) {
        this.sitioWebInput.sendKeys(sitioWeb);
    };

    getSitioWebInput = function() {
        return this.sitioWebInput.getAttribute('value');
    };

    setCorreoInput = function(correo) {
        this.correoInput.sendKeys(correo);
    };

    getCorreoInput = function() {
        return this.correoInput.getAttribute('value');
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
