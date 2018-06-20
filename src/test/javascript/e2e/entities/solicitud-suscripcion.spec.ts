import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('SolicitudSuscripcion e2e test', () => {

    let navBarPage: NavBarPage;
    let solicitudSuscripcionDialogPage: SolicitudSuscripcionDialogPage;
    let solicitudSuscripcionComponentsPage: SolicitudSuscripcionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load SolicitudSuscripcions', () => {
        navBarPage.goToEntity('solicitud-suscripcion');
        solicitudSuscripcionComponentsPage = new SolicitudSuscripcionComponentsPage();
        expect(solicitudSuscripcionComponentsPage.getTitle())
            .toMatch(/Solicitud Suscripcions/);

    });

    it('should load create SolicitudSuscripcion dialog', () => {
        solicitudSuscripcionComponentsPage.clickOnCreateButton();
        solicitudSuscripcionDialogPage = new SolicitudSuscripcionDialogPage();
        expect(solicitudSuscripcionDialogPage.getModalTitle())
            .toMatch(/Create or edit a Solicitud Suscripcion/);
        solicitudSuscripcionDialogPage.close();
    });

    it('should create and save SolicitudSuscripcions', () => {
        solicitudSuscripcionComponentsPage.clickOnCreateButton();
        solicitudSuscripcionDialogPage.setFechaInput('2000-12-31');
        expect(solicitudSuscripcionDialogPage.getFechaInput()).toMatch('2000-12-31');
        solicitudSuscripcionDialogPage.estadoSelectLastOption();
        solicitudSuscripcionDialogPage.setDescripcionInput('descripcion');
        expect(solicitudSuscripcionDialogPage.getDescripcionInput()).toMatch('descripcion');
        solicitudSuscripcionDialogPage.solicitanteSelectLastOption();
        solicitudSuscripcionDialogPage.comercioSelectLastOption();
        solicitudSuscripcionDialogPage.save();
        expect(solicitudSuscripcionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SolicitudSuscripcionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-solicitud-suscripcion div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class SolicitudSuscripcionDialogPage {
    modalTitle = element(by.css('h4#mySolicitudSuscripcionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    fechaInput = element(by.css('input#field_fecha'));
    estadoSelect = element(by.css('select#field_estado'));
    descripcionInput = element(by.css('input#field_descripcion'));
    solicitanteSelect = element(by.css('select#field_solicitante'));
    comercioSelect = element(by.css('select#field_comercio'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setFechaInput = function(fecha) {
        this.fechaInput.sendKeys(fecha);
    };

    getFechaInput = function() {
        return this.fechaInput.getAttribute('value');
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
    setDescripcionInput = function(descripcion) {
        this.descripcionInput.sendKeys(descripcion);
    };

    getDescripcionInput = function() {
        return this.descripcionInput.getAttribute('value');
    };

    solicitanteSelectLastOption = function() {
        this.solicitanteSelect.all(by.tagName('option')).last().click();
    };

    solicitanteSelectOption = function(option) {
        this.solicitanteSelect.sendKeys(option);
    };

    getSolicitanteSelect = function() {
        return this.solicitanteSelect;
    };

    getSolicitanteSelectedOption = function() {
        return this.solicitanteSelect.element(by.css('option:checked')).getText();
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
