import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Suscripcion e2e test', () => {

    let navBarPage: NavBarPage;
    let suscripcionDialogPage: SuscripcionDialogPage;
    let suscripcionComponentsPage: SuscripcionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Suscripcions', () => {
        navBarPage.goToEntity('suscripcion');
        suscripcionComponentsPage = new SuscripcionComponentsPage();
        expect(suscripcionComponentsPage.getTitle())
            .toMatch(/Suscripcions/);

    });

    it('should load create Suscripcion dialog', () => {
        suscripcionComponentsPage.clickOnCreateButton();
        suscripcionDialogPage = new SuscripcionDialogPage();
        expect(suscripcionDialogPage.getModalTitle())
            .toMatch(/Create or edit a Suscripcion/);
        suscripcionDialogPage.close();
    });

    it('should create and save Suscripcions', () => {
        suscripcionComponentsPage.clickOnCreateButton();
        suscripcionDialogPage.setDetalleInput('detalle');
        expect(suscripcionDialogPage.getDetalleInput()).toMatch('detalle');
        suscripcionDialogPage.setFechaCreacionInput('2000-12-31');
        expect(suscripcionDialogPage.getFechaCreacionInput()).toMatch('2000-12-31');
        suscripcionDialogPage.estadoSelectLastOption();
        suscripcionDialogPage.setFechaCancelacionInput('2000-12-31');
        expect(suscripcionDialogPage.getFechaCancelacionInput()).toMatch('2000-12-31');
        suscripcionDialogPage.setFechaCobroInput('2000-12-31');
        expect(suscripcionDialogPage.getFechaCobroInput()).toMatch('2000-12-31');
        suscripcionDialogPage.usuarioSelectLastOption();
        suscripcionDialogPage.comercioSelectLastOption();
        suscripcionDialogPage.save();
        expect(suscripcionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SuscripcionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-suscripcion div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class SuscripcionDialogPage {
    modalTitle = element(by.css('h4#mySuscripcionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    detalleInput = element(by.css('input#field_detalle'));
    fechaCreacionInput = element(by.css('input#field_fechaCreacion'));
    estadoSelect = element(by.css('select#field_estado'));
    fechaCancelacionInput = element(by.css('input#field_fechaCancelacion'));
    fechaCobroInput = element(by.css('input#field_fechaCobro'));
    usuarioSelect = element(by.css('select#field_usuario'));
    comercioSelect = element(by.css('select#field_comercio'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setDetalleInput = function(detalle) {
        this.detalleInput.sendKeys(detalle);
    };

    getDetalleInput = function() {
        return this.detalleInput.getAttribute('value');
    };

    setFechaCreacionInput = function(fechaCreacion) {
        this.fechaCreacionInput.sendKeys(fechaCreacion);
    };

    getFechaCreacionInput = function() {
        return this.fechaCreacionInput.getAttribute('value');
    };

    setEstadoSelect = function(estado) {
        this.estadoSelect.sendKeys(estado);
    };

    getEstadoSelect = function() {
        return this.estadoSelect.element(by.css('option:checked')).getText();
    };

    estadoSelectLastOption = function() {
        this.estadoSelect.all(by.tagName('option')).last().click();
    };
    setFechaCancelacionInput = function(fechaCancelacion) {
        this.fechaCancelacionInput.sendKeys(fechaCancelacion);
    };

    getFechaCancelacionInput = function() {
        return this.fechaCancelacionInput.getAttribute('value');
    };

    setFechaCobroInput = function(fechaCobro) {
        this.fechaCobroInput.sendKeys(fechaCobro);
    };

    getFechaCobroInput = function() {
        return this.fechaCobroInput.getAttribute('value');
    };

    usuarioSelectLastOption = function() {
        this.usuarioSelect.all(by.tagName('option')).last().click();
    };

    usuarioSelectOption = function(option) {
        this.usuarioSelect.sendKeys(option);
    };

    getUsuarioSelect = function() {
        return this.usuarioSelect;
    };

    getUsuarioSelectedOption = function() {
        return this.usuarioSelect.element(by.css('option:checked')).getText();
    };

    comercioSelectLastOption = function() {
        this.comercioSelect.all(by.tagName('option')).last().click();
    };

    comercioSelectOption = function(option) {
        this.comercioSelect.sendKeys(option);
    };

    getComercioSelect = function() {
        return this.comercioSelect;
    };

    getComercioSelectedOption = function() {
        return this.comercioSelect.element(by.css('option:checked')).getText();
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
