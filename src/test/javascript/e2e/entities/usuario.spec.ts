import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Usuario e2e test', () => {

    let navBarPage: NavBarPage;
    let usuarioDialogPage: UsuarioDialogPage;
    let usuarioComponentsPage: UsuarioComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Usuarios', () => {
        navBarPage.goToEntity('usuario');
        usuarioComponentsPage = new UsuarioComponentsPage();
        expect(usuarioComponentsPage.getTitle())
            .toMatch(/Usuarios/);

    });

    it('should load create Usuario dialog', () => {
        usuarioComponentsPage.clickOnCreateButton();
        usuarioDialogPage = new UsuarioDialogPage();
        expect(usuarioDialogPage.getModalTitle())
            .toMatch(/Create or edit a Usuario/);
        usuarioDialogPage.close();
    });

    it('should create and save Usuarios', () => {
        usuarioComponentsPage.clickOnCreateButton();
        usuarioDialogPage.setFechaCreacionInput('2000-12-31');
        expect(usuarioDialogPage.getFechaCreacionInput()).toMatch('2000-12-31');
        usuarioDialogPage.setFechaNacimientoInput('2000-12-31');
        expect(usuarioDialogPage.getFechaNacimientoInput()).toMatch('2000-12-31');
        usuarioDialogPage.setCedulaInput('cedula');
        expect(usuarioDialogPage.getCedulaInput()).toMatch('cedula');
        usuarioDialogPage.setDireccionInput('direccion');
        expect(usuarioDialogPage.getDireccionInput()).toMatch('direccion');
        usuarioDialogPage.setTelefonoInput('telefono');
        expect(usuarioDialogPage.getTelefonoInput()).toMatch('telefono');
        usuarioDialogPage.setFotoUrlInput('fotoUrl');
        expect(usuarioDialogPage.getFotoUrlInput()).toMatch('fotoUrl');
        usuarioDialogPage.setLatitudInput('5');
        expect(usuarioDialogPage.getLatitudInput()).toMatch('5');
        usuarioDialogPage.setLongitudInput('5');
        expect(usuarioDialogPage.getLongitudInput()).toMatch('5');
        usuarioDialogPage.userDetailSelectLastOption();
        usuarioDialogPage.save();
        expect(usuarioDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class UsuarioComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-usuario div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class UsuarioDialogPage {
    modalTitle = element(by.css('h4#myUsuarioLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    fechaCreacionInput = element(by.css('input#field_fechaCreacion'));
    fechaNacimientoInput = element(by.css('input#field_fechaNacimiento'));
    cedulaInput = element(by.css('input#field_cedula'));
    direccionInput = element(by.css('input#field_direccion'));
    telefonoInput = element(by.css('input#field_telefono'));
    fotoUrlInput = element(by.css('input#field_fotoUrl'));
    latitudInput = element(by.css('input#field_latitud'));
    longitudInput = element(by.css('input#field_longitud'));
    userDetailSelect = element(by.css('select#field_userDetail'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setFechaCreacionInput = function(fechaCreacion) {
        this.fechaCreacionInput.sendKeys(fechaCreacion);
    };

    getFechaCreacionInput = function() {
        return this.fechaCreacionInput.getAttribute('value');
    };

    setFechaNacimientoInput = function(fechaNacimiento) {
        this.fechaNacimientoInput.sendKeys(fechaNacimiento);
    };

    getFechaNacimientoInput = function() {
        return this.fechaNacimientoInput.getAttribute('value');
    };

    setCedulaInput = function(cedula) {
        this.cedulaInput.sendKeys(cedula);
    };

    getCedulaInput = function() {
        return this.cedulaInput.getAttribute('value');
    };

    setDireccionInput = function(direccion) {
        this.direccionInput.sendKeys(direccion);
    };

    getDireccionInput = function() {
        return this.direccionInput.getAttribute('value');
    };

    setTelefonoInput = function(telefono) {
        this.telefonoInput.sendKeys(telefono);
    };

    getTelefonoInput = function() {
        return this.telefonoInput.getAttribute('value');
    };

    setFotoUrlInput = function(fotoUrl) {
        this.fotoUrlInput.sendKeys(fotoUrl);
    };

    getFotoUrlInput = function() {
        return this.fotoUrlInput.getAttribute('value');
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

    userDetailSelectLastOption = function() {
        this.userDetailSelect.all(by.tagName('option')).last().click();
    };

    userDetailSelectOption = function(option) {
        this.userDetailSelect.sendKeys(option);
    };

    getUserDetailSelect = function() {
        return this.userDetailSelect;
    };

    getUserDetailSelectedOption = function() {
        return this.userDetailSelect.element(by.css('option:checked')).getText();
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
